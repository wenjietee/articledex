import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const SearchResults = (props) => {
	// states
	const [foundArticles, setFoundArticles] = useState();

	// on load get data
	useEffect(() => {
		// format string
		let queries = props.location.search.substring(3).split(' ').join('+');

		// find articles
		try {
			Axios.get(`/api/articles/search/?q=${queries}`).then((response) => {
				// set state with found articles
				setFoundArticles(response.data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [props.location.search]);
	return (
		<React.Fragment>
			<CssBaseline />

			<Box mt={3}>
				<Container fixed>
					<h1>
						Search results for: {props.location.search.substring(3)}
					</h1>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={9} md={8} lg={7}>
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
						</Grid>
					</Grid>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default SearchResults;
