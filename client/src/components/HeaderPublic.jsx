import React from 'react';

const HeaderPublic = (props) => {
	return (
		<div>
			<h1>Home</h1>

			<button onClick={props.logout}>Log Out</button>
		</div>
	);
};

export default HeaderPublic;
