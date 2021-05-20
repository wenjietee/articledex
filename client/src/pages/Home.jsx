import React from 'react';

const Home = (props) => {
	return (
		<div>
			<h1>Home</h1>

			<button onClick={props.logout}>Log Out</button>
		</div>
	);
};

export default Home;
