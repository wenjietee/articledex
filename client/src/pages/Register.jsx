import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import RegistrationForm from '../components/RegistrationForm';

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
				<RegistrationForm />
			</Box>
		</React.Fragment>
	);
};

export default Register;
