import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, user, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!user.isAuth ? (
					<Component {...rest} {...props} />
				) : (
					<Redirect to='/home' />
				)
			}
		/>
	);
};

export default PublicRoute;
