import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';

const Home = (props) => {
	const [articles, setArticles] = useState();

	useEffect(() => {
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
	}, []);

	return (
		<div>
			<pre>{JSON.stringify(articles, null, 2)}</pre>
		</div>
	);
};

export default Home;
