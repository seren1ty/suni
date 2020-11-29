import React from 'react';
import { getWeatherForcast } from '../../../services/weather.service';
import { GetServerSideProps } from "next";
import Error from '../../../components/error.component';
import CurrentWeather from '../../../components/current-weather.component';
import ForcastWeather from '../../../components/forcast-weather.component';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cityParam = context.query.city.toLowerCase();

    let result;

    try {
        result = await getWeatherForcast(cityParam);
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
            city: cityParam,
            current: result.current,
            daily: result.daily.splice(1)
        }
    }
}

const WeatherCityPage = (props) => {

    if (props.error)
        return <Error customError={{ message: props.error }}/>

    return (
        <div>
            <CurrentWeather city={props.city} current={props.current} />
            <ForcastWeather daily={props.daily} />
        </div>
    )
}

export default WeatherCityPage;