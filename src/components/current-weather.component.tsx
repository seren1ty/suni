import React from 'react'

const CurrentWeather = props => {
    return (
        <div className="current-holder">
            <div className="current-panel current-left-holder">
                <div className="current-left-panel">
                    {
                        props.day ? (
                            <p>{props.day}</p>
                        ) : (
                            <p>current</p>
                        )
                    }
                    <h1>{props.city}</h1>
                    <p>{props.current.weather[0].description}</p>
                </div>
                <div className="current-right-panel">
                    <p className="current-temp">{props.current.temp}</p>
                </div>
            </div>
            <div className="current-panel current-right-holder">
                <table>
                    <tbody>
                        <tr>
                            <th>Feels like</th>
                            <td>{props.current.feels_like}</td>
                        </tr>
                        <tr>
                            <th>Wind speed</th>
                            <td>{props.current.wind_speed}</td>
                        </tr>
                        <tr>
                            <th>UV Index</th>
                            <td>{props.current.uvi}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CurrentWeather;