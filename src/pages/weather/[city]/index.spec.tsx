import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherCityPage from './index';

describe('WeatherCityPage', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            city: 'sydney',
            current: {
                temp: 21.0,
                weather: [{ description: 'Cloudy' }]
            },
            daily: [
                { dt: 1606525200, temp: { day: 16.0 }, weather: [{ description: 'Sunny' }] }
            ]
        };
    });

    it('should render city temp and daily', () => {
        const { getByText } = render(<WeatherCityPage {...expectedProps} />);
        const heading = getByText(expectedProps.city);
        const temp = getByText(expectedProps.current.temp);
        const dailyTemp = getByText(expectedProps.daily[0].temp.day);

        expect(heading).toBeVisible();
        expect(temp).toBeVisible();
        expect(dailyTemp).toBeVisible();
    });
});