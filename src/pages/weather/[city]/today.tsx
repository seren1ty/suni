import React from 'react';
import { getWeatherToday } from '../../../services/weather.service';
import { GetServerSideProps } from "next";
import Error from '../../../components/error.component';
import CurrentWeather from '../../../components/current-weather.component';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const city = context.query.city.toLowerCase();

    let result;

    try {
        result = await getWeatherToday(city);
    } catch(e) {
        console.error(e);

        return {
            props: {
                error: e.message
            }
        }
    }

    return {
        props: {
            city: city,
            current: result.current
        }
    }
}

const WeatherCityTodayPage = (props) => {

    if (props.error)
        return <Error customError={{ message: props.error }}/>

    return (
        <CurrentWeather city={props.city} current={props.current} day='today' />
    )
}

export default WeatherCityTodayPage;