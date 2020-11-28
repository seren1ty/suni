// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWeatherToday } from "../../../../services/weather.service";

export default async (req, res) => {

    let city = req.query.city;

    if (!city) {
        res.statusCode = 400;
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
