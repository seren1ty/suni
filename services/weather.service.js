export async function getWeatherToday(props) {

    if (props.type === 'TODAY') {

        console.log('Got it!');

        const APPID = process.env.OPENWEATHERMAP_APPID;

        const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${APPID}&units=metric`);

        //console.log('Weather Data: ', weatherData.json);

        return await weatherData.json();
    }

    return null;
}