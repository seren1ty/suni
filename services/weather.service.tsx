import { isSunday, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday } from 'date-fns';

export async function getWeatherForcast(cityName: string) {
    const weatherData = await lookupWeather(cityName, 'minutely,hourly,alerts');

    console.log('Weather Data [Forcast]: ', weatherData);

    return weatherData;
}

export async function getWeatherToday(cityName: string) {
    const weatherData = await lookupWeather(cityName, 'minutely,hourly,daily,alerts');

    console.log('Weather Data [Current]: ', weatherData);

    return weatherData;
}

export async function getWeatherOnDay(cityName: string, dayName: string) {
    const weatherData = await lookupWeather(cityName, 'current,minutely,hourly,alerts');

    const matchingDaysWeather = weatherData.daily.find((day: any) => matchDailyWeatherToDayName(day, dayName));

    console.log('Weather Data [Daily]: ', matchingDaysWeather);

    return matchingDaysWeather;
}

const lookupCooridinates = async (cityName: string) => {

    const APIKEY = process.env.MAPQUESTAPI_KEY;

    const cityRS = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${APIKEY}&location=${cityName}`);

    const cityData = await cityRS.json();

    const latLng = cityData.results[0].locations[0].latLng;

    console.log('Lat/Lng Data: ', latLng);

    return latLng;
}

const lookupWeather = async (cityName: string, excludeFields: string) => {

    const latLng = await lookupCooridinates(cityName);

    const APPID = process.env.OPENWEATHERMAP_APPID;

    const weatherRS = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLng.lat}&lon=${latLng.lng}&appid=${APPID}&units=metric&exclude=${excludeFields}`);

    return await weatherRS.json();
}

const matchDailyWeatherToDayName = (day: any, dayName: string) => {
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