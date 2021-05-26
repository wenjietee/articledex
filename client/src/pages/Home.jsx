import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
import UnreadCard from '../components/UnreadCard';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = (props) => {
	// states
	const [articles, setArticles] = useState();
	const [unreads, setUnreads] = useState();

	// on load get data
	useEffect(() => {
		// get articles
		try {
			Axios.get(`${process.env.REACT_APP_URL}api/articles/`).then(
				(response) => {
					// set state with article
					setArticles(response.data);
				}
			);
		} catch (error) {
			console.log(error);
		}
		// get user unreads
		try {
			Axios.get(`${process.env.REACT_APP_URL}api/unreads/`).then(
				(response) => {
					const filteredData = [];
					console.log(response.data);
					response.data.user_unreads.forEach((unread) => {
						if (!unread.status) {
							filteredData.push(unread);
						}
					});
					// set state with article
					setUnreads(filteredData);
				}
			);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />
			<Box ml={30} mt={3}>
				<div>
					{unreads ? <UnreadCard unreads={unreads} /> : undefined}
				</div>
				<div>
					{articles ? (
						articles.map((article) => {
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
			</Box>
		</React.Fragment>
	);
};

export default Home;
