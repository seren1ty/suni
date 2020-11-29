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
                temp: 21.0,
                weather: [{ description: 'Cloudy' }]
            }
        };
    });

    it('should render city, day and temp', () => {
        const { getByText } = render(<WeatherCityDayPage {...expectedProps} />);
        const day = getByText(expectedProps.day);
        const city = getByText(expectedProps.city);
        const temp = getByText(expectedProps.current.temp);

        expect(city).toBeVisible();
        expect(day).toBeVisible();
        expect(temp).toBeVisible();
    });
});