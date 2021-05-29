import Axios from '../utils/Axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ArticleForm from '../components/ArticleForm';

const ArticleCreate = () => {
	// states
	const [articleId, setArticleId] = useState();
	const [isSubmitted, setSubmitted] = useState(false);

	// create article
	const createArticle = async (inputs) => {
		//let scrapedContent = undefined;
		// webscraper activates here

		try {
			const { data } = await Axios.post(`/api/articles/create/`, {
				url: inputs.url,
				article_type: inputs.article_type,
				title: inputs.title,
				content: 'scraped content',
				description: inputs.description,
				tags: inputs.tags.split(' '),
			});
			// set submit to true and set article id
			setSubmitted(true);
			setArticleId(data.id);
		} catch (error) {
			alert(error);
		}
	};

	if (isSubmitted && articleId) {
		return <Redirect to={`/article/${articleId}`} />;
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
