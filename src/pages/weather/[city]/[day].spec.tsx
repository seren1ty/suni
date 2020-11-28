import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherCityDayPage from './[day]';

describe('WeatherCityDayPage', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            city: 'sydney',
            day: 'monday',
            current: {
                temp: { day: 21.0 },
                weather: [{ description: 'Cloudy' }]
            }
        };
    });

    it('should render city, day and temp', () => {
        const { getByText } = render(<WeatherCityDayPage {...expectedProps} />);
        const city = getByText(expectedProps.city);
        const day = getByText(expectedProps.day);
        const temp = getByText(expectedProps.current.temp.day);

        expect(city).toBeVisible();
        expect(day).toBeVisible();
        expect(temp).toBeVisible();
    });
});