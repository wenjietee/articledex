import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
import UnreadCard from '../components/UnreadCard';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Home = (props) => {
	// states
	const [articles, setArticles] = useState();
	const [unreads, setUnreads] = useState();

	// on load get data
	useEffect(() => {
		// get articles
		try {
			Axios.get(`/api/articles/`).then((response) => {
				// set state with article
				setArticles(response.data);
			});
		} catch (error) {
			console.log(error);
		}
		// get user unreads
		try {
			Axios.get(`/api/unreads/`).then((response) => {
				const filteredData = [];

				response.data.user_unreads.forEach((unread) => {
					if (unread.status) {
						filteredData.push(unread);
					}
				});
				// set state with article
				setUnreads(filteredData);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />

			<Box mt={3}>
				<Container fixed>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={9} md={8} lg={7}>
							<Grid container>
								<Grid item xs>
									{articles ? (
										articles.map((article) => {
											return (
												<ArticleCard
													key={article.id}
													article={article}
													username={
														props.user.username
													}
												/>
											);
										})
									) : (
										<CircularProgress />
									)}
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3} md={4} lg={5}>
							{unreads ? (
								<UnreadCard unreads={unreads} />
							) : undefined}
						</Grid>
					</Grid>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default Home;
