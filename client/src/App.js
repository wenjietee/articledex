import './App.css';
import Axios from './utils/Axios';
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	const [isAuth, setUser] = useState(false);

	// handle login
	async function login(e, username, password) {
		e.preventDefault();

		try {
			let { data } = await Axios.post('api/login/', {
				username: username,
				password: password,
			});

			// set tokens
			localStorage.setItem('access', data.access);
			localStorage.setItem('refresh', data.refresh);

			// login user
			setUser(true);
		} catch (error) {
			console.log(error.response);
		}
	}

	function logout(e) {
		e.preventDefault();

		// remove tokens
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');

		// logout user
		setUser(false);
	}
	return (
		<div className='App'>
			<Router>
				<Switch>
					<PublicRoute
						exact
						path='/'
						isAuth={isAuth}
						component={Landing}
					/>
					<PublicRoute
						exact
						path='/login'
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
			</Router>
		</div>
	);
}

export default App;
