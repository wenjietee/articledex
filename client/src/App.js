import './App.css';
import Axios from './utils/Axios';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	async function login(username, password) {
		try {
			let { data } = await Axios.post('api/login/', {
				username: username,
				password: password,
			});

			localStorage.setItem('access', data.access);
			localStorage.setItem('refresh', data.refresh);
		} catch (error) {
			console.log(error.response);
		}
	}

	return (
		<div className='App'>
			<button onClick={login}>Login</button>
		</div>
	);
}

export default App;
