import React from 'react';
import { getWeatherOnDay } from '../../../services/weather.service';
import { GetServerSideProps } from "next";
import Error from '../../../components/error.component';
import CurrentWeather from '../../../components/current-weather.component';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cityParam = context.query.city.toLowerCase();
    const dayParam = context.params.day.toLowerCase();

    let daysWeather;

    try {
        daysWeather = await getWeatherOnDay(cityParam, dayParam);
    } catch(e) {
        console.error(e);

        return {
            props: {
                error: e.message
            }
        }
    }

    console.log(daysWeather);

    return {
        props: {
            city: cityParam,
            day: dayParam,
            current: daysWeather
        }
    }
}

const WeatherCityDayPage = (props) => {

    if (props.error)
        return <Error error={{ message: props.error }}/>

    return <CurrentWeather city={props.city} current={props.current} day={props.day} />
}

export default WeatherCityDayPage;