import Axios from '../utils/Axios';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
	// handle registration
	const registerUser = async (inputs) => {
		try {
			let { data } = await Axios.post('api/register/', {
				username: inputs.username,
				email: inputs.email,
				password: inputs.password,
			});
			alert(`Status ${data.status}:${data.message} `);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};
	return (
		<React.Fragment>
			<CssBaseline />

			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'
			>
				<RegistrationForm registerUser={registerUser} />
			</Box>
		</React.Fragment>
	);
};

export default Register;
