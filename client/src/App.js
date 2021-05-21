import './App.css';
import Axios from './utils/Axios';
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Article from './pages/Article';
import ArticleForm from './pages/ArticleForm';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HeaderPublic from './components/HeaderPublic';
import HeaderProtected from './components/HeaderProtected';

const App = () => {
	const [isAuth, setAuth] = useState(false);

	// handle login
	const login = async (username, password) => {
		try {
			let { data } = await Axios.post('api/login/', {
				username: username,
				password: password,
			});

			// set tokens
			localStorage.setItem('access', data.access);
			localStorage.setItem('refresh', data.refresh);

			// login user
			setAuth(true);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};

	const logout = () => {
		// remove tokens
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');

		// logout user
		setAuth(false);
	};
	return (
		<React.Fragment>
			<Router>
				{isAuth ? (
					<HeaderProtected logout={logout} />
				) : (
					<HeaderPublic />
				)}
				<main>
					<Switch>
						<PublicRoute
							exact
							path='/'
							login={login}
							isAuth={isAuth}
							component={Landing}
						/>
						<PublicRoute
							exact
							path='/login'
							login={login}
							isAuth={isAuth}
							component={Login}
						/>
						<PublicRoute
							exact
							path='/register'
							isAuth={isAuth}
							component={Register}
						/>
						<ProtectedRoute
							exact
							path='/home'
							logout={logout}
							isAuth={isAuth}
							component={Home}
						/>
						<ProtectedRoute
							exact
							path='/article/create'
							isAuth={isAuth}
							component={ArticleForm}
						/>
						<ProtectedRoute
							exact
							path='/article/:id'
							isAuth={isAuth}
							component={Article}
						/>
						<ProtectedRoute
							exact
							path='/article/:id/edit'
							isAuth={isAuth}
							component={ArticleForm}
						/>
						<ProtectedRoute
							exact
							path='/profile'
							isAuth={isAuth}
							component={Profile}
						/>
						<ProtectedRoute
							exact
							path='/profile/edit'
							isAuth={isAuth}
							component={ProfileEdit}
						/>
						<Route exact path='/404' component={NotFound} />
						<Redirect to='/404' />
					</Switch>
				</main>
			</Router>
		</React.Fragment>
	);
};

export default App;
