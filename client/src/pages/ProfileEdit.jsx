import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ProfileEditForm from '../components/ProfileEditForm';

const ProfileEdit = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'
			>
				<ProfileEditForm />
			</Box>
		</React.Fragment>
	);
};

export default ProfileEdit;
