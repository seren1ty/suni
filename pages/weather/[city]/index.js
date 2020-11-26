import { useRouter } from 'next/router';
import { getWeatherToday } from '../../../services/weather.service';

// Called always on every page request. Even on production. For constantly updating data
export const getServerSideProps = async context => {
    const { main, weather } = await getWeatherToday({ type: 'TODAY'});

    /*console.log('Weather Data: ', result);

    if (!!result)
        console.log('Got it!'); */

    return {
        props: {
            weatherForcast: { main, weather },
            myFavNum: Math.random()
        }
    }
}

// Executes on server AND client
const DynamicServerside = (props) => {

    const router = useRouter();

    console.log(router.query.city);

    return (
      <div>
          <h1>Hello</h1>
          <p>{props.weatherForcast.weather[0].description}</p>
      </div>
    )
  }

  export default DynamicServerside;