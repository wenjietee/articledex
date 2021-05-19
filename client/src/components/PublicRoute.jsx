import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuth ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to='/home' />
				)
			}
		/>
	);
};

export default PublicRoute;
