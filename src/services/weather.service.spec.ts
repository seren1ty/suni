import { lookupWeather, getWeatherOnDay } from './weather.service';

describe('lookupWeather', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return weather', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            results: [{ locations: [{ latLng: { lat: 1.41, lng: 2.42 }}] }]
        }));

        fetchMock.mockResponseOnce(JSON.stringify({
            weather: true
        }));

        const result = await lookupWeather('sydney', '');

        expect(result).toBeDefined();
        expect(result.weather).toBe(true);
    });

    it('should fail to return weather when api down', async () => {
        fetchMock.mockReject(() => Promise.reject("API is down"));

        expect(lookupWeather('sydney', '')).rejects.toThrow("Please try again later");
    });
});

describe('getWeatherOnDay', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return matching days weather', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            results: [{ locations: [{ latLng: { lat: 1.41, lng: 2.42 }}] }]
        }));

        fetchMock.mockResponseOnce(JSON.stringify({
            daily: [
                { dt: 1606784400 }
            ]
        }));

        const result = await getWeatherOnDay('sydney', 'tuesday');

        expect(result).toBeDefined();
        expect(result.dt).toBe(1606784400);
    });

    it('should fail to return weather when day invalid', async () => {
        await expect(getWeatherOnDay('sydney', 'wrongday')).rejects.toThrow("Provided name must be either 'today', or a day of the week");
    });
});