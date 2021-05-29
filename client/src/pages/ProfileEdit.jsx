import Axios from '../utils/Axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ProfileEditForm from '../components/ProfileEditForm';

const ProfileEdit = () => {
	// states
	const [profile, setProfile] = useState();
	const [isSubmitted, setSubmitted] = useState(false);

	// get article
	useEffect(() => {
		try {
			Axios.get(`/api/profile/edit`).then((response) => {
				// set state with fetched article
				setProfile({
					description: response.data.description,
					image: response.data.image,
				});
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	const editProfile = async (inputs) => {
		try {
			await Axios.put(`/api/profile/edit`, {
				description: inputs.description,
				image: inputs.image,
			});
			setSubmitted(true);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};
	if (isSubmitted) {
		return <Redirect to='/profile' />;
	}
	return (
		<React.Fragment>
			<CssBaseline />
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='80vh'
			>
				{profile ? (
					<ProfileEditForm
						profile={profile}
						editProfile={editProfile}
					/>
				) : undefined}
			</Box>
		</React.Fragment>
	);
};

export default ProfileEdit;
