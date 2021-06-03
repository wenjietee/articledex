import './App.css';
import Axios from './utils/Axios';
import React, { useState, useEffect } from 'react';
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
import ArticleCreate from './pages/ArticleCreate';
import ArticleEdit from './pages/ArticleEdit';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import OfflineHome from './pages/OfflineHome';
import LocalArticle from './pages/LocalArticle';
import SearchResults from './pages/SearchResults';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HeaderPublic from './components/HeaderPublic';
import HeaderProtected from './components/HeaderProtected';
import Footer from './components/Footer';

const App = () => {
	const [isAuth, setAuth] = useState(false);
	const [user, setUser] = useState();
	useEffect(() => {
		const access = localStorage.getItem('access');

		// Verify token
		if (access) {
			try {
				Axios.get('api/verify/').then((response) => {
					// verify auth
					setAuth(true);
					// set user data
					setUser(response.data);
					console.log('verification success');
				});
			} catch (error) {
				// logout user if auth failed
				console.log('verification', error);

				logout();
			}
		} else {
			setAuth(false);
		}
	}, []);

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
			// set user data
			localStorage.setItem('user', JSON.stringify(data.user));
			setUser(data.user);
			// set auth status
			setAuth(true);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};

	const logout = () => {
		// clear items
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		localStorage.removeItem('user');
		// logout user
		setAuth(false);
	};

	return (
		<React.Fragment>
			<Router>
				{isAuth ? (
					<HeaderProtected logout={logout} user={user} />
				) : (
					<HeaderPublic />
				)}
				<main>
					{window.navigator.onLine ? (
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
								path='/article/create'
								isAuth={isAuth}
								component={ArticleCreate}
							/>
							<ProtectedRoute
								exact
								path='/article/:id'
								isAuth={isAuth}
								user={user}
								component={Article}
							/>
							<ProtectedRoute
								exact
								path='/article/:id/edit'
								isAuth={isAuth}
								component={ArticleEdit}
							/>
							<ProtectedRoute
								exact
								path='/profile'
								isAuth={isAuth}
								user={user}
								component={Profile}
							/>
							<ProtectedRoute
								exact
								path='/profile/edit'
								isAuth={isAuth}
								user={user}
								component={ProfileEdit}
							/>
							<ProtectedRoute
								exact
								path='/home'
								logout={logout}
								isAuth={isAuth}
								user={user}
								component={Home}
							/>
							<ProtectedRoute
								exact
								path='/search/'
								logout={logout}
								isAuth={isAuth}
								user={user}
								component={SearchResults}
							/>
							<Route exact path='/404' component={NotFound} />
							<Redirect to='/404' />
						</Switch>
					) : (
						<Switch>
							<Route exact path='/' component={OfflineHome} />
							<Route
								exact
								path='/article/local/:id'
								component={LocalArticle}
							/>
							<Route exact path='/404' component={NotFound} />
							<Redirect to='/404' />
						</Switch>
					)}
				</main>
				<Footer />
			</Router>
		</React.Fragment>
	);
};

export default App;
