import { getWeatherOnDay } from "../../../../services/weather.service";

export default async (req, res) => {

    if (req.method !== 'GET')
        return res.status(405).end();

    let { city, day } = req.query;

    if (!city) {
        res.status(400);
        res.json({ error: "Url path must contain a city" });
        return;
    }

    if (!day) {
        res.status(400);
        res.json({ error: "Url path must contain either 'today', or a day of the week" });
        return;
    }

    city = city.toLowerCase();
    day = day.toLowerCase();

    let result;

    try {
        result = await getWeatherOnDay(city, day);
    } catch(e) {
        console.error(e);

        res.json({ error: e.message });
    }

    res.json({
        result: {
            city: city,
            day: day,
            current: result
        }
    })
}
