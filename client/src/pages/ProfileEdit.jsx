import Axios from '../utils/Axios';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ProfileEditForm from '../components/ProfileEditForm';

const ProfileEdit = () => {
	const [profile, setProfile] = useState();
	useEffect(() => {
		// fetched article
		Axios.get(`${process.env.REACT_APP_URL}api/profile/edit`).then(
			(response) => {
				// set state with fetched article
				setProfile({
					description: response.data.description,
					image: response.data.image,
				});
			}
		);
	}, []);

	const editProfile = async (inputs) => {
		try {
			await Axios.put(`${process.env.REACT_APP_URL}api/profile/edit`, {
				description: inputs.description,
				image: inputs.image,
			});
			alert(`Profile edited`);
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
