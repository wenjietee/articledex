import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

const Profile = (props) => {
	// states
	const [profile, setProfile] = useState();

	// get profile
	useEffect(() => {
		// get articles
		try {
			Axios.get(`${process.env.REACT_APP_URL}api/profile/`).then(
				(response) => {
					// set state with article
					setProfile(response.data);
				}
			);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />

			<h1>Profile page</h1>

			<Button
				variant='contained'
				color='primary'
				disableElevation={true}
				component={Link}
				to='/profile/edit'
			>
				EDIT PROFILE
			</Button>
			<pre>{JSON.stringify(profile, null, 2)}</pre>
		</React.Fragment>
	);
};

export default Profile;
