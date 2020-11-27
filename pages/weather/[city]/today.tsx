import React from 'react';
import { getWeatherToday } from '../../../services/weather.service';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cityParam = context.query.city.toLowerCase();

    const { current } = await getWeatherToday(cityParam);

    return {
        props: {
            city: cityParam,
            weather: current
        }
    }
}

const WeatherCityTodayPage = (props) => {

    return (
        <div>
            <h1>Today {props.city}</h1>
            <p>{props.weather.temp}</p>
            <p>{props.weather.weather[0].description}</p>
        </div>
    )
}

export default WeatherCityTodayPage;