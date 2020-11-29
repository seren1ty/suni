import React from 'react';
import format from 'date-fns/format';

const ForcastWeather = props => {

    const formatDate = (unixDate: number) => {
        return format(new Date(unixDate * 1000), 'iiii');
    }

    return (
        <div className="forcast-container">
            <h3>Forcast</h3>
            <div className="forcast-holder">
            {
                props.daily.map(day => (
                    <div className="forcast-panel" key={day.dt}>
                        <div>{formatDate(day.dt)}</div>
                        <div className="current-temp">{day.temp.day}</div>
                        <div>{day.weather[0].description}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ForcastWeather;