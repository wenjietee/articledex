import React from 'react';

const HeaderProtected = (props) => {
	return (
		<div>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
			>
				<LoginForm login={props.login} />
			</Box>
			<h1>Home</h1>

			<button onClick={props.logout}>Log Out</button>
		</div>
	);
};

export default HeaderProtected;
