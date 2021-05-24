import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import ArticleCard from '../components/ArticleCard';
import UnreadCard from '../components/UnreadCard';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';

const Home = () => {
	// states
	const [articles, setArticles] = useState();
	const [unreads, setUnreads] = useState();
	const [onlyUser, setOnlyUser] = useState({ checked: false });

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

	const handleChange = (e) => {
		setOnlyUser({ [e.target.name]: e.target.checked });
	};
	return (
		<React.Fragment>
			<CssBaseline />

			<Box ml={30} mt={3}>
				<div>
					<Switch
						checked={onlyUser.checked}
						onChange={handleChange}
						color='primary'
						name='checked'
						inputProps={{ 'aria-label': 'primary checkbox' }}
					/>
					<label>Show only my articles</label>
				</div>
				<div>
					{articles
						? articles.map((article) => {
								return (
									<ArticleCard
										key={article.id}
										article={article}
									/>
								);
						  })
						: undefined}
				</div>
				<div>
					{unreads ? <UnreadCard unreads={unreads} /> : undefined}
				</div>
			</Box>
		</React.Fragment>
	);
};

export default Home;
