import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherCityTodayPage from './today';

describe('WeatherCityTodayPage', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            city: 'sydney',
            current: {
                temp: 21.0,
                weather: [{ description: 'Cloudy' }]
            }
        };
    });

    it('should render city and temp', () => {
        const { getByText } = render(<WeatherCityTodayPage {...expectedProps} />);
        const today = getByText('today');
        const heading = getByText(expectedProps.city);
        const temp = getByText(expectedProps.current.temp);

        expect(today).toBeVisible();
        expect(heading).toBeVisible();
        expect(temp).toBeVisible();
    });
});