import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const Login = (props) => {
	const [user, setUser] = useState({ username: '', password: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		props.login(user.username, user.password);
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	return (
		<React.Fragment>
			<CssBaseline />

			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
			>
				<form onSubmit={handleSubmit}>
					<Typography variant='body1' gutterBottom>
						Have an Account?
					</Typography>
					<div>
						<Box pt={2}>
							<TextField
								id='username'
								label='Username'
								variant='outlined'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='password'
								label='Password'
								variant='outlined'
								type='password'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<Box pt={2} align='center'>
						<Button
							variant='contained'
							color='primary'
							type='submit'
						>
							SIGN IN
						</Button>
					</Box>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Login;
