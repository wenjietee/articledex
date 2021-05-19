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
	const [user, setUser] = useState({ isAuth: false });

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
			setUser({ isAuth: true });
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
		setUser({ isAuth: false });
	}
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route
						exact
						path='/'
						login={login}
						render={(props) => (
							<Landing {...props} user={user} login={login} />
						)}
					/>
					<ProtectedRoute exact path='/home' component={Home} />
					<Route exact path='/404' component={NotFound} />
					<Redirect to='/404' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
