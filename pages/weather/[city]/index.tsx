import React from 'react';
import { getWeatherToday } from '../../../services/weather.service';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { current } = await getWeatherToday(context.query.city);

    return {
        props: {
            city: context.query.city,
            weather: current
        }
    }
}

const WeatherTodayPage = (props) => {

    return (
      <div>
          <h1>{props.city}</h1>
          <p>{props.weather.temp}</p>
          <p>{props.weather.weather[0].description}</p>
      </div>
    )
  }

  export default WeatherTodayPage;