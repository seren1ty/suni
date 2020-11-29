import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss';
import TitleBar from '../components/title-bar.component';

function MyApp({ Component, pageProps }) {
    return (
        <div className="container">
            <TitleBar />
            <div className="main">
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp
