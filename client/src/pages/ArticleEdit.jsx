import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Axios from '../utils/Axios';
import Box from '@material-ui/core/Box';
import ArticleForm from '../components/ArticleForm';

const ArticleEdit = () => {
	const [article, setArticle] = useState();

	useEffect(() => {
		// fetched article
		Axios.get(
			`${process.env.REACT_APP_URL}api/articles/show/cc18b4fe-35b2-4586-8ad0-71153c3a7300`
		).then((response) => {
			// set state with fetched article
			setArticle({
				url: response.data.url,
				article_type: response.data.article_type,
				title: response.data.title,
				description: response.data.description,
				tags: response.data.tags.join(' '),
			});
		});
	}, []);
	const editArticle = async (inputs) => {
		//let scrapedContent = undefined;
		// webscraper activates here

		try {
			await Axios.put(
				`${process.env.REACT_APP_URL}api/articles/show/cc18b4fe-35b2-4586-8ad0-71153c3a7300`,
				{
					url: inputs.url,
					article_type: inputs.article_type,
					title: inputs.title,
					content: 'scraped content edited',
					description: inputs.description,
					tags: inputs.tags.split(' '),
				}
			);
			alert(`Article edited`);
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
				<ArticleForm article={article} handleSubmit={editArticle} />
			</Box>
		</React.Fragment>
	);
};

export default ArticleEdit;
