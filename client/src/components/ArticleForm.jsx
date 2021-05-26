import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
				initialValues={
					props.article
						? {
								url: props.article.url,
								article_type: props.article.article_type,
								title: props.article.title,
								description: props.article.description,
								tags: props.article.tags,
						  }
						: {
								url: '',
								article_type: 'webpage',
								title: '',
								description: '',
								tags: '',
						  }
				}
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
				{({ values, isSubmitting }) => (
					<Form>
						<Grid
							container
							spacing={3}
							className={classes.textField}
						>
							<Grid item xs={8}>
								<Field
									name='url'
									placeholder='www.myarticle.com/'
									label='URL*'
									type='input'
									fullWidth
									variant='outlined'
									as={TextField}
									value={values.url}
								/>

								<Typography color='error'>
									<ErrorMessage name='url' />
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Field
									name='article_type'
									type='select'
									label='Article Type'
									variant='outlined'
									fullWidth
									as={Select}
									value={values.article_type}
								>
									<MenuItem value='webpage'>webpage</MenuItem>
								</Field>
							</Grid>
							<Grid item xs={12}>
								<Field
									name='title'
									placeholder='article title'
									label='Title*'
									type='text'
									variant='outlined'
									fullWidth
									as={TextField}
									value={values.title}
								/>
								<Typography color='error'>
									<ErrorMessage name='title' />
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Field
									name='description'
									placeholder='Description'
									label='Description'
									type='text'
									variant='outlined'
									multiline
									rows={10}
									rowsMax={10}
									fullWidth
									as={TextField}
									value={values.description}
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									name='tags'
									placeholder='Seperate tags with spacing. Eg. Tag1 Tag2'
									label='Tags'
									type='text'
									variant='outlined'
									fullWidth
									as={TextField}
									value={values.tags}
								/>
							</Grid>
						</Grid>

						<Box pt={2} align='center'>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								size='large'
								disabled={isSubmitting}
							>
								SUBMIT
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ArticleForm;
