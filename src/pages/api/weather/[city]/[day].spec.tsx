import day from './[day]';
import { getWeatherOnDay } from "../../../../services/weather.service";

jest.mock("../../../../services/weather.service", () => ({
    getWeatherOnDay: jest.fn(() => {
        return {
            temp: 21.0,
            weather: [{ description: 'Cloudy' }]
        };
    })
  }));

  describe("weather day route", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        method: "GET",
        query: { city: 'sydney', day: 'monday' }
      };

      res = {
        status: jest.fn(() => res),
        end: jest.fn(),
        json: jest.fn()
      };
    });

    it("should get weather and return result", async () => {
        await day(req, res);

        expect(getWeatherOnDay).toHaveBeenCalledWith(req.query.city, req.query.day);
        expect(res.json).toHaveBeenCalledWith({
            result: {
                city: req.query.city,
                day: req.query.day,
                current: {
                    temp: 21.0,
                    weather: [{ description: 'Cloudy' }]
                }
            }
        });
    });

    it("should return 405 if the method is not GET", async () => {
      req.method = 'POST';

      await day(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if city not provided", async () => {
        req.query.city = undefined;

        await day(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Url path must contain a city' });
    });

    it("should return 400 if day not provided", async () => {
        req.query.day = undefined;

        await day(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Url path must contain either 'today', or a day of the week" });
    });
});