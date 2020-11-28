import { lookupCooridinates } from './city.service';

describe('lookupCooridinates', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should return coordinates', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            results: [{ locations: [{ latLng: { lat: 1.41, lng: 2.42 }}] }]
        }));

        const result = await lookupCooridinates('sydney');

        expect(result).toBeDefined();
        expect(result.lat).toBe(1.41);
        expect(result.lng).toBe(2.42);
    });

    it('should fail to return coordinates when city invalid', async () => {
        await expect(lookupCooridinates('syd4ney')).rejects.toThrow("Provided city must contain only letters");
    });

    it('should fail to return coordinates when api down', async () => {
        fetchMock.mockReject(() => Promise.reject("API is down"));

        expect(lookupCooridinates('sydney')).rejects.toThrow("Please try again later");
    });
});