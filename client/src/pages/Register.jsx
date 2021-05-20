import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
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
				{/* <form action='' onSubmit=''>
					<Typography variant='p' gutterBottom>
						New User
					</Typography>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Username'
								variant='outlined'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Email'
								variant='outlined'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Password'
								variant='outlined'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<div>
						<Box pt={2}>
							<TextField
								id='outlined-basic'
								label='Confirm Password'
								variant='outlined'
								onChange={handleChange}
							/>
						</Box>
					</div>
					<Box pt={2} align='center'>
						<Button variant='contained' color='primary'>
							SIGN UP
						</Button>
					</Box>
				</form> */}
			</Box>
		</React.Fragment>
	);
};

export default Register;
