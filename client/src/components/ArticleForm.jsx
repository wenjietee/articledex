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
		width: '40em',
	},
}));

// form schema
const articleSchema = Yup.object({
	url: Yup.string().required(),
	article_type: Yup.string(),
	title: Yup.string().required(),
	description: Yup.string(),
	tags: Yup.string(),
});

// form component
const ArticleForm = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Formik
				initialValues={{
					url: '',
					article_type: '',
					title: '',
					description: '',
					tags: '',
				}}
				validationSchema={articleSchema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(data, { setSubmitting }) => {
					// disable button when submitting form
					setSubmitting(true);

					// submit data to server
					props.handleSubmit(data);

					// enable button
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, values }) => (
					<Form>
						<Typography variant='body1' gutterBottom>
							Save an Article
						</Typography>
						<div>
							<Box pt={2}>
								<Field
									name='url'
									placeholder='www.myarticle.com/'
									label='URL*'
									type='input'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>

								<Typography color='error'>
									<ErrorMessage name='url' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='article_type'
									label='Article Type'
									type='input'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>

								<Typography color='error'>
									<ErrorMessage name='url' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='title'
									placeholder='article title'
									label='Title*'
									type='text'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
								<Typography color='error'>
									<ErrorMessage name='title' />
								</Typography>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='description'
									placeholder='Description'
									label='Description'
									type='text'
									variant='outlined'
									multiline
									rows={10}
									rowsMax={10}
									className={classes.textField}
									as={TextField}
								/>
							</Box>
						</div>
						<div>
							<Box pt={2}>
								<Field
									name='tags'
									placeholder='Seperate tags with spacing. Eg. Tag1 Tag2'
									label='Tags'
									type='text'
									variant='outlined'
									className={classes.textField}
									as={TextField}
								/>
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
