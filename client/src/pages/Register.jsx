import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const Register = () => {
	return (
		<React.Fragment>
			<CssBaseline />

			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='100vh'
			>
				<form action='' onSubmit=''>
					<Typography variant='p' gutterBottom>
						New User
					</Typography>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Username'
								variant='outlined'
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Email'
								variant='outlined'
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Password'
								variant='outlined'
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Confirm Password'
								variant='outlined'
							/>
						</Box>
					</div>
					<Box pt={2} align='center'>
						<Button
							variant='contained'
							color='primary'
							href='/home'
						>
							SIGN UP
						</Button>
					</Box>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default Register;
