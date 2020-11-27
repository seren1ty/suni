import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// Called always on every page request. Even on production. For constantly updating data
export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            myFavNum: Math.random()
        }
    }
}

// Executes on server AND client
const DynamicServerside = (props) => {

    const router = useRouter();

    console.log(router.query.city + ' - ' + router.query.day);

    return (
      <div>
          <h1>Hello from Dynamic {props.myFavNum}</h1>
      </div>
    )
  }

  export default DynamicServerside;