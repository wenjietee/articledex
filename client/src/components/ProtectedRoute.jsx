import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				user.isAuth ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
};

export default ProtectedRoute;
