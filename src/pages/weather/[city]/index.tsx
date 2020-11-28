import React from 'react';
import { getWeatherForcast } from '../../../services/weather.service';
import { GetServerSideProps } from "next";
import Error from '../../../components/error.component';

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
            daily: result.daily
        }
    }
}

const WeatherCityPage = (props) => {

    if (props.error)
        return <Error customError={{ message: props.error }}/>

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