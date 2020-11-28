const WORDS_ONLY = /^[a-z ]+$/i;

export async function lookupCooridinates(cityName: string) {
    if (!WORDS_ONLY.test(cityName)) {
        throw new Error("Provided city must contain only letters");
    }

    const APIKEY = process.env.MAPQUESTAPI_KEY;

    let latLng;

    try {
        const cityRS = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${APIKEY}&location=${cityName}`);

        const cityData = await cityRS.json();

        latLng = cityData.results[0].locations[0].latLng;
    } catch (e) {
        let error = e.message;

        if (e.code === 'ENOTFOUND')
            error = 'Please try again later';

        throw new Error(error);
    }

    return latLng;
}