import React from 'react';
import { getWeatherOnDay } from '../../../services/weather.service';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cityParam = context.query.city.toLowerCase();
    const dayParam = context.params.day.toLowerCase();

    const daysWeather = await getWeatherOnDay(cityParam, dayParam);

    console.log(daysWeather);

    return {
        props: {
            city: cityParam,
            day: dayParam,
            weather: daysWeather
        }
    }
}

const WeatherCityDayPage = (props) => {

    return (
        <div>
            <h1>{props.day} {props.city}</h1>
            <p>{props.weather.temp.day}</p>
            <p>{props.weather.weather[0].description}</p>
        </div>
    )
}

export default WeatherCityDayPage;