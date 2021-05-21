import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
	console.log('protected route', isAuth);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
};

export default ProtectedRoute;
