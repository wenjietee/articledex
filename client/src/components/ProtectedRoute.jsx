import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
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
