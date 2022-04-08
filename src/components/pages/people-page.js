import React from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';
import { useParams, useNavigate } from 'react-router-dom';

const PeoplePage = () => {
	
	let navigate = useNavigate();
	const {id} = useParams();

		return (
			<Row 
				left={<PersonList 
							onItemSelected={(idItem) => navigate(`/people/${idItem}`)} 
						/>}
				right={<PersonDetails itemId={id} />}
			/>
		);
	};

	export default PeoplePage;
