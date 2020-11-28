import forcast from './index';
import { getWeatherForcast } from "../../../../services/weather.service";

jest.mock("../../../../services/weather.service", () => ({
    getWeatherForcast: jest.fn(() => {
        return {
            current: {
                temp: 21.0,
                weather: [{ description: 'Cloudy' }]
            },
            daily: [
                { dt: 1606525200, temp: { day: 16.0 }, weather: [{ description: 'Sunny' }] }
            ]
        };
    })
  }));

  describe("weather forcast route", () => {
    let req;
    let res;

    beforeEach(() => {
      req = {
        method: "GET",
        query: { city: 'sydney' }
      };

      res = {
        status: jest.fn(() => res),
        end: jest.fn(),
        json: jest.fn()
      };
    });

    it("should get weather and return result", async () => {
        await forcast(req, res);

        expect(getWeatherForcast).toHaveBeenCalledWith(req.query.city);
        expect(res.json).toHaveBeenCalledWith({
            result: {
                city: req.query.city,
                current: {
                    temp: 21.0,
                    weather: [{ description: 'Cloudy' }]
                },
                daily: [
                    { dt: 1606525200, temp: { day: 16.0 }, weather: [{ description: 'Sunny' }] }
                ]
            }
        });
    });

    it("should return 405 if the method is not GET", async () => {
      req.method = 'POST';

      await forcast(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if city not provided", async () => {
        req.query.city = undefined;

        await forcast(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Url path must contain a city' });
    });
});