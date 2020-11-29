import { isSunday, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday } from 'date-fns';
import { lookupCooridinates } from './city.service';

const DAY_NAMES = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Lookup the weather for a city, for the current day, plus the next week
export const getWeatherForcast = async (cityName: string) => {
    return await lookupWeather(cityName, 'minutely,hourly,alerts');
}

// Lookup the weather for a city, for the current day only
export const getWeatherToday = async (cityName: string) => {
    return await lookupWeather(cityName, 'minutely,hourly,daily,alerts');
}

// Lookup the weather for a city, for a requested day, in the next week
export const getWeatherOnDay = async (cityName: string, dayName: string) => {
    if (DAY_NAMES.indexOf(dayName) < 0)
        throw new Error("Provided name must be either 'today', or a day of the week");

    const weatherData = await lookupWeather(cityName, 'current,minutely,hourly,alerts');

    // Locate the future day that matches the day name provided
    const matchingDaysWeather = weatherData.daily.find((day: any) => matchDailyWeatherToDayName(day, dayName));

    // Alter future days structure to match current days structure
    matchingDaysWeather.temp = matchingDaysWeather.temp.day;
    matchingDaysWeather.feels_like = matchingDaysWeather.feels_like.day;

    return matchingDaysWeather;
}

export const lookupWeather = async (cityName: string, excludeFields: string) => {
    const latLng = await lookupCooridinates(cityName);

    const APPID = process.env.OPENWEATHERMAP_APPID;

    let weatherData;

    try {
        const weatherRS = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latLng.lat}&lon=${latLng.lng}&appid=${APPID}&units=metric&exclude=${excludeFields}`
        );

        weatherData = await weatherRS.json();
    } catch (e) {
        let error = e.message;

        if (e.code === 'ENOTFOUND')
            error = 'Please try again later';

        console.error(e);

        throw new Error(error);
    }

    return weatherData;
}

export const matchDailyWeatherToDayName = (day: any, dayName: string) => {
    const date = new Date(day.dt * 1000);

    if (isMonday(date) && dayName === 'monday')
        return true;

    if (isTuesday(date) && dayName === 'tuesday')
        return true;

    if (isWednesday(date) && dayName === 'wednesday')
        return true;

    if (isThursday(date) && dayName === 'thursday')
        return true;

    if (isFriday(date) && dayName === 'friday')
        return true;

    if (isSaturday(date) && dayName === 'saturday')
        return true;

    if (isSunday(date) && dayName === 'sunday')
        return true;

    return false;
}