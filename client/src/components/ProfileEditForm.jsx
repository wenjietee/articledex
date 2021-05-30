import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CloudinaryWidget from './CloudinaryWidget';
import Avatar from '@material-ui/core/Avatar';

// form styles
const useStyles = makeStyles((theme) => ({
	textField: {
		width: '30em',
	},
	image: {
		height: '150px',
		width: '150px',
		objectFit: 'cover',
	},
}));

// form schema
const ProfileSchema = Yup.object({
	description: Yup.string(),
	image: Yup.string(),
});

// form component
const ProfileEditForm = (props) => {
	const classes = useStyles();

	const [image, setImage] = useState(props.profile.image);

	// set image from cloudinary
	const getImageUrl = (image) => {
		setImage(image);
	};

	return (
		<div>
			<Formik
				initialValues={{
					description: props.profile.description,
					image: image,
				}}
				enableReinitialize
				validationSchema={ProfileSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(data, { setSubmitting }) => {
					// disable button when submitting form
					setSubmitting(true);

					// edit user
					props.editProfile(data);

					// enable button
					setSubmitting(false);
				}}
			>
				{({ values, isSubmitting }) => (
					<Form>
						<Typography variant='body1' gutterBottom>
							Edit Profile
						</Typography>

						<div>
							<Box
								component='div'
								display='flex'
								alignItems='flex-start'
								p={5}
							>
								<Box mr={2}>
									<Avatar
										alt='Profile'
										src={values.image}
										className={classes.image}
									/>
								</Box>
								<Box mt={6}>
									<CloudinaryWidget
										getImageUrl={getImageUrl}
										className={classes.button}
									/>
								</Box>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='description'
									placeholder='Bio'
									label='Bio'
									type='text'
									variant='outlined'
									multiline
									rows={8}
									rowsMax={8}
									className={classes.textField}
									as={TextField}
									value={values.description}
								/>
								<Typography color='error'>
									<ErrorMessage name='description' />
								</Typography>
							</Box>
						</div>

						<Box pt={2} align='center'>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								size='large'
								disabled={isSubmitting}
							>
								EDIT PROFILE
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ProfileEditForm;
