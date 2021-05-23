import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const Profile = () => {
	return (
		<div>
			<h1>Profile page</h1>
			<Button
				variant='contained'
				disableElevation={true}
				component={Link}
				to='/profile/edit'
			>
				EDIT PROFILE
			</Button>
		</div>
	);
};

export default Profile;
