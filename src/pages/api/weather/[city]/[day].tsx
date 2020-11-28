// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWeatherOnDay } from "../../../../services/weather.service";

export default async (req, res) => {

    let { city, day } = req.query;

    if (!city) {
        res.statusCode = 400;
        res.json({ Error: "Url path must contain a city" });
        return;
    }

    if (!day) {
        res.statusCode = 400;
        res.json({ Error: "Url path must contain either 'today' or a city" });
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
