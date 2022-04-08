import React from 'react';

import ItemList from '../item-list';
import {
	withData, 
	withSwapiService, 
	withRenderFunction, 
	compose
} from '../hoc-helpers';


const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({name, model}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople
	};
};

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets
	};
};

const mapStarshipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships
	};
};

const PersonList = compose(
							withSwapiService(mapPersonMethodsToProps),
							withData,
							withRenderFunction(renderName)
							)(ItemList);

const PlanetList = compose(
							withSwapiService(mapPlanetMethodsToProps),
							withData,
							withRenderFunction(renderName)
							)(ItemList);

const StarshipList = compose(
								withSwapiService(mapStarshipMethodsToProps),
								withData,
								withRenderFunction(renderModelAndName)
								)(ItemList);

export {
	PersonList,
	PlanetList,
	StarshipList
};