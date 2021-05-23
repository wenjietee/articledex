import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	button: {
		marginRight: 10,
		minWidth: '5em',
	},
	hideButton: {
		display: 'none',
	},
	chip: {
		marginRight: 5,
	},
}));

const Article = (props) => {
	// states
	const classes = useStyles();
	const [article, setArticle] = useState();
	const [isUserArticle, setUserArticle] = useState();

	// get article
	useEffect(() => {
		try {
			Axios.get(
				`${process.env.REACT_APP_URL}api/articles/show/${props.match.params.id}`
			).then((response) => {
				// set state with fetched article
				setArticle(response.data);

				//check if article belongs to user
				if (response.data.user === props.user.id) {
					setUserArticle(true);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [props.match.params.id, props.user.id]);

	const handleDelete = () => {
		// delete article
		try {
			Axios.delete(
				`${process.env.REACT_APP_URL}api/articles/show/${props.match.params.id}`
			);
			alert('article deleted');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<React.Fragment>
			<CssBaseline />
			{article ? (
				<Box mt={1} p={10}>
					<Grid container spacing={3} alignItems='center'>
						<Grid item xs={8}></Grid>
						<Grid item xs={4}>
							<Button
								color='primary'
								variant='outlined'
								component={Link}
								className={
									isUserArticle
										? classes.button
										: classes.hideButton
								}
								to={`/article/${article.id}/edit`}
							>
								EDIT
							</Button>
							<Button
								color='primary'
								variant='outlined'
								onClick={handleDelete}
								className={
									isUserArticle
										? classes.button
										: classes.hideButton
								}
							>
								DELETE
							</Button>
						</Grid>
						<Grid item xs={8}>
							<h1>{article.title}</h1>
							<h3>
								<a href={article.url}>Source</a>
							</h3>
						</Grid>
						<Grid item xs={4}>
							<p>Saved by:</p>
							<p>{article.user}</p>
						</Grid>
						<Grid item xs={8}></Grid>
						<Grid item xs={4}>
							<p>Tags:</p>
							{article.tags.map((tag) => {
								return (
									<Chip
										key={tag}
										label={tag}
										component='a'
										size='small'
										href='#'
										clickable
										className={classes.chip}
									/>
								);
							})}
						</Grid>
						<Grid item xs={12}>
							<p>{article.content}</p>
						</Grid>
					</Grid>
				</Box>
			) : undefined}
		</React.Fragment>
	);
};

export default Article;
