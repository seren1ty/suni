import today from './today';
import { getWeatherToday } from "../../../../services/weather.service";

jest.mock("../../../../services/weather.service", () => ({
    getWeatherToday: jest.fn(() => {
        return {
            current: {
                temp: 21.0,
                weather: [{ description: 'Cloudy' }]
            }
        };
    })
  }));

  describe("weather today route", () => {
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
        await today(req, res);

        expect(getWeatherToday).toHaveBeenCalledWith(req.query.city);
        expect(res.json).toHaveBeenCalledWith({
            result: {
                city: req.query.city,
                current: {
                    temp: 21.0,
                    weather: [{ description: 'Cloudy' }]
                }
            }
        });
    });

    it("should return 405 if the method is not GET", async () => {
      req.method = 'POST';

      await today(req, res);

      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if city not provided", async () => {
        req.query.city = undefined;

        await today(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Url path must contain a city' });
    });
});