import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import CloudinaryWidget from './CloudinaryWidget';

// form styles
const useStyles = makeStyles((theme) => ({
	textField: {
		width: '30em',
	},
}));

// form schema
const ProfileSchema = Yup.object({
	description: Yup.string(),
});

// form component
const ProfileEditForm = (props) => {
	const classes = useStyles();
	return (
		<div>
			<Formik
				initialValues={{
					description: '',
				}}
				validationSchema={ProfileSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(data, { setSubmitting }) => {
					// disable button when submitting form
					setSubmitting(true);

					// register user
					//props.editProfile(data);

					// enable button
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Typography variant='body1' gutterBottom>
							Edit Profile
						</Typography>
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
								/>
								<Typography color='error'>
									<ErrorMessage name='description' />
								</Typography>
							</Box>
						</div>

						<div>
							<Box pt={2}>
								<CloudinaryWidget />
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
