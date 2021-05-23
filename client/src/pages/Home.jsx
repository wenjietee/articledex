import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
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
					// set state with article
					setUnreads(response.data);
				}
			);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div>
			{articles
				? articles.map((article) => {
						return (
							<ArticleCard key={article.id} article={article} />
						);
				  })
				: undefined}
			<pre>{JSON.stringify(articles, null, 2)}</pre>
			<pre>{JSON.stringify(unreads, null, 2)}</pre>
		</div>
	);
};

export default Home;
