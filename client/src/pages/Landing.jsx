import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
	return (
		<div>
			<h1>Landing</h1>
			<p>
				<Link to='/home'>Articledex</Link>
			</p>
			<p>Logged in status: {props.user.isAuth}</p>
			<button onClick={props.login}>Log In</button>
		</div>
	);
};

export default Landing;
