import '../styles/globals.css'
import { CityProvider } from '../context/city.context';

function MyApp({ Component, pageProps }) {

    const newPageProps = {...pageProps, hello: true};

    return (
        <CityProvider>
            <Component {...newPageProps} />
        </CityProvider>
    )
}

export default MyApp
