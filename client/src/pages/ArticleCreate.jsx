import Axios from '../utils/Axios';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ArticleForm from '../components/ArticleForm';

const ArticleCreate = () => {
	const createArticle = async (inputs) => {
		//let scrapedContent = undefined;
		// webscraper activates here

		try {
			await Axios.post(
				`${process.env.REACT_APP_URL}api/articles/create/`,
				{
					url: inputs.url,
					article_type: inputs.article_type,
					title: inputs.title,
					content: 'scraped content',
					description: inputs.description,
					tags: inputs.tags.split(' '),
				}
			).then((response) => {
				alert('article created');
			});
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
				<Container fixed align='center'>
					<Typography variant='body1' gutterBottom>
						Save an Article
					</Typography>

					<ArticleForm handleSubmit={createArticle} />
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default ArticleCreate;
