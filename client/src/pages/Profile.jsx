import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfileCard from '../components/ProfileCard';

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
			<Box ml={30} mt={3}>
				<h1>My Profile</h1>
				{profile ? (
					<ProfileCard
						profile={profile.profile}
						unreads={profile.user_unreads}
						username={profile.username}
						likes={profile.user_likes}
					/>
				) : undefined}

				<pre>{JSON.stringify(profile, null, 2)}</pre>
			</Box>
		</React.Fragment>
	);
};

export default Profile;
