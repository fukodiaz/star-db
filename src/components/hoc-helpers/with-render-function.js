import React from 'react';

const withRenderFunction = (fn) => (View) => {
	return (props) => {
		return (
			<View {...props} renderItem={fn} />
		);
	};
};

export default withRenderFunction;