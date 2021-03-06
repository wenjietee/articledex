import Axios from '../utils/Axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ArticleForm from '../components/ArticleForm';
import CircularProgress from '@material-ui/core/CircularProgress';

const ArticleEdit = (props) => {
	// states
	const [article, setArticle] = useState();
	const [isSubmitted, setSubmitted] = useState(false);

	// get article data
	useEffect(() => {
		Axios.get(`/api/articles/show/${props.match.params.id}`).then(
			(response) => {
				// set state with fetched article

				setArticle({
					url: response.data.article.url,
					article_type: response.data.article.article_type,
					title: response.data.article.title,
					description: response.data.article.description,
					tags: response.data.article.tags.join(' '),
				});
			}
		);
	}, [props.match.params.id]);

	const editArticle = async (inputs) => {
		try {
			await Axios.put(`/api/articles/show/${props.match.params.id}`, {
				url: inputs.url,
				article_type: inputs.article_type,
				title: inputs.title,
				description: inputs.description,
				tags: inputs.tags.split(' '),
			});
			setSubmitted(true);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};
	if (isSubmitted) {
		return <Redirect to={`/article/${props.match.params.id}`} />;
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
						Edit an Article
					</Typography>

					{article ? (
						<ArticleForm
							article={article}
							handleSubmit={editArticle}
						/>
					) : (
						<CircularProgress />
					)}
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default ArticleEdit;
