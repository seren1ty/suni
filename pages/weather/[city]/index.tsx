import React from 'react';
import { getWeatherForcast } from '../../../services/weather.service';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const cityParam = context.query.city.toLowerCase();

    const { current, daily } = await getWeatherForcast(cityParam);

    return {
        props: {
            city: cityParam,
            current: current,
            daily: daily
        }
    }
}

const WeatherCityPage = (props) => {

    return (
        <div>
            <div>
                <h1>{props.city}</h1>
                <p>{props.current.temp}</p>
                <p>{props.current.weather[0].description}</p>
            </div>
            <div>
                <h3>Forcast</h3>
                <div>
                {
                    props.daily.map(day => (
                        <div key={day.dt}>
                            <p>{day.temp.day}</p>
                            <p>{day.weather[0].description}</p>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default WeatherCityPage;