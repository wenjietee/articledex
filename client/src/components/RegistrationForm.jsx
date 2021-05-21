import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

// form styles
const useStyles = makeStyles((theme) => ({
	textField: {
		width: '30em',
	},
}));

// form schema
const RegistrationSchema = Yup.object({
	username: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().required(),
	passwordConfirmation: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

// form component
const RegistrationForm = (props) => {
	const classes = useStyles();
	return (
		<div>
			<Formik
				initialValues={{
					username: '',
					email: '',
					password: '',
					passwordConfirmation: '',
				}}
				validationSchema={RegistrationSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(data, { setSubmitting }) => {
					// disable button when submitting form
					setSubmitting(true);

					// register user
					props.registerUser(data);

					// enable button
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Typography variant='body1' gutterBottom>
							New User
						</Typography>
						<div>
							<Box pt={2}>
								<Field
									name='username'
									placeholder='Username'
									label='Username'
									type='input'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
								<Typography color='error'>
									<ErrorMessage name='username' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='email'
									placeholder='email@address.com'
									label='Email'
									type='email'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
								<Typography color='error'>
									<ErrorMessage name='email' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='password'
									placeholder='Password'
									label='Password'
									type='password'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
								<Typography color='error'>
									<ErrorMessage name='password' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='passwordConfirmation'
									placeholder='Confirm Password'
									label='Confirm Password'
									type='password'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
								<Typography color='error'>
									<ErrorMessage name='passwordConfirmation' />
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
								SIGN UP
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegistrationForm;
