import React, { useState } from 'react';

type ContextProps = {
    children: React.ReactNode
}

export type Coordinates = {
    lon: number;
    lat: number;
}

export type City = {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: Coordinates;
}

type CityData = {
    cities: City[] | null;
    findCoordinates: (cityName: string) => Coordinates;
    loadCities: () => void;
}

const CityContext = React.createContext<CityData | null>(null);

const CityProvider = ({children}: ContextProps) => {

    const [cities, setCities] = useState<City[]>();

    const loadCities = () => {
        console.log('Loading cities...');

        const cityData = require('../data/city.list.json');

        console.log(cityData[0]);

        setCities(cityData);
    }

    const findCoordinates = (cityName: string) => {
        return !!cities ? cities[0].coord : null;
    }

    return (
        <CityContext.Provider value={{ cities, loadCities, findCoordinates }}>
            {children}
        </CityContext.Provider>
    );
}

export { CityContext, CityProvider };