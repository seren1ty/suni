import { getWeatherToday } from "../../../../services/weather.service";

export default async (req, res) => {

    if (req.method !== 'GET')
        return res.status(405).end();

    let city = req.query.city;

    if (!city) {
        res.status(400);
        res.json({ error: 'Url path must contain a city' });
        return;
    }

    city = city.toLowerCase();

    let result;

    try {
        result = await getWeatherToday(city);
    } catch(e) {
        console.error(e);

        res.json({ error: e.message });
    }

    res.json({
        result: {
            city: city,
            current: result.current
        }
    })
}
