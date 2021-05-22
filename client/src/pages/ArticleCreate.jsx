import Axios from '../utils/Axios';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ArticleForm from '../components/ArticleForm';

const ArticleCreate = () => {
	// const createArticle = async (inputs) => {
	// 	//let scrapedContent = undefined;
	// 	// webscraper activates here
	// 	console.log(inputs);
	// 	try {
	// 		let { data } = await Axios.post(
	// 			`${process.env.REACT_APP_URL}api/articles/create/`,
	// 			{
	// 				url: inputs.url,
	// 				article_type: inputs.article_type,
	// 				title: inputs.title,
	// 				content: 'scraped content',
	// 				description: inputs.description,
	// 				tags: ['webdev'],
	// 			}
	// 		);
	// 		alert(`Status ${data.status}:${data.message} `);
	// 	} catch (error) {
	// 		alert(
	// 			`Error ${error.response.status}: ${error.response.data.detail}`
	// 		);
	// 	}
	// };

	// test tags to array
	const createArticle = (inputs) => {
		console.log(inputs);
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
				<ArticleForm handleSubmit={createArticle} />
			</Box>
		</React.Fragment>
	);
};

export default ArticleCreate;
