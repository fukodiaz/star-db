import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import { StarshipDetails } from '../sw-components';

import { 
	PeoplePage,
	PlanetsPage,
	StarshipsPage,
	LoginPage,
	SecretPage
} from '../pages';

import './app.css';

import { 
	BrowserRouter as Router,
	Routes, 
	Route,
	Navigate
} from 'react-router-dom';


export default class App extends Component {
	
	state = {
		swapiService: new SwapiService(),
		isLoggedIn: false
	};

	onLogin = () => {
		this.setState({
			isLoggedIn: true
		});
	};

	onServiceChange = () => {
		this.setState(({swapiService}) => {
			const Service = swapiService instanceof SwapiService ?
									DummySwapiService : SwapiService;
			return {
				swapiService: new Service()
			};
		});
	};

	render()	{
		const {isLoggedIn} = this.state;

		return (
			<ErrorBoundry>
				<SwapiServiceProvider value = {this.state.swapiService}>
					<Router>
						<div className='stardb-app'>
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet />
							<ErrorButton />

							<Routes >
								<Route path="/" exact element={<h2>Welcome to StarDB</h2>} />
								<Route path="/people/">
									<Route path=":id" element={<PeoplePage />} />
									<Route path="" element={<PeoplePage />} />
								</Route>

								<Route path="/planets" element={<PlanetsPage />} />
								<Route path="/starships" exact element={<StarshipsPage />} />
								<Route path="/starships/:id" element={<StarshipDetails />} />
								<Route path="/login"
											element={<LoginPage 
																isLoggedIn={isLoggedIn}
															onLogin={this.onLogin} />} />
								<Route path="/secret" 
											element={<SecretPage isLoggedIn={isLoggedIn} />} />
							</Routes>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
}

