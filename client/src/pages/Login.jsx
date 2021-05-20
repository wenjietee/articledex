import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LoginForm from '../components/LoginForm';

const Login = (props) => {
	return (
		<React.Fragment>
			<CssBaseline />

			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
			>
				<LoginForm login={props.login} />
			</Box>
		</React.Fragment>
	);
};

export default Login;
