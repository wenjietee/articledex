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
const articleSchema = Yup.object({
	username: Yup.string().required(),
	password: Yup.string().required(),
});

// form component
const ArticleForm = (props) => {
	const classes = useStyles();
	return (
		<div>
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={articleSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(data, { setSubmitting }) => {
					// disable button when submitting form
					setSubmitting(true);

					// create article
					//props.createArticle(data);

					// enable button
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Typography variant='body1' gutterBottom>
							Have an Account?
						</Typography>
						<div>
							<Box pt={2}>
								<Field
									name='username'
									placeholder='Username*'
									label='Username*'
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
									name='password'
									label='Password*'
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
						<Box pt={2} align='center'>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								size='large'
								disabled={isSubmitting}
							>
								ADD ARTICLE
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ArticleForm;
