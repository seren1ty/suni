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

export async function getWeatherToday(cityName: string) {
    const weatherData = await lookupWeather(cityName, 'minutely,hourly,daily,alerts');

    console.log('Weather Data [Current]: ', weatherData);

    return weatherData;
}

export async function getWeatherForcast(cityName: string) {
    const weatherData = await lookupWeather(cityName, 'minutely,hourly,alerts');

    console.log('Weather Data [Forcast]: ', weatherData);

    return weatherData;
}

export async function getWeatherOnDay(cityName: string) {
    const weatherData = await lookupWeather(cityName, 'current,minutely,hourly,alerts');

    console.log('Weather Data [Forcast]: ', weatherData);

    return weatherData;
}