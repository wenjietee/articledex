import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ArticleForm from '../components/ArticleForm';

const ArticleEdit = () => {
	const editArticle = (inputs) => {
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
				<ArticleForm handleSubmit={editArticle} />
			</Box>
		</React.Fragment>
	);
};

export default ArticleEdit;
