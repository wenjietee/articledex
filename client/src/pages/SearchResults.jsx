import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const SearchResults = (props) => {
	// states
	const [foundArticles, setFoundArticles] = useState();

	// on load get data
	useEffect(() => {
		console.log(props);
		// find articles
		// try {
		// 	Axios.get(`/api/articles/search/?q=`).then((response) => {
		// 		// set state with found articles
		// 		setFoundArticles(response.data);
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />

			<Box ml={30} mt={3}>
				<Container>
					<div>
						{foundArticles ? (
							foundArticles.map((article) => {
								return (
									<ArticleCard
										key={article.id}
										article={article}
										username={props.user.username}
									/>
								);
							})
						) : (
							<CircularProgress />
						)}
					</div>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default SearchResults;
