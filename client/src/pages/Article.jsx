import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0.5, 0.5),
		minWidth: '5em',
		width: '6em',
	},
	hideButton: {
		display: 'none',
	},
	chip: {
		marginRight: 5,
	},
	title: {
		marginTop: '-2em',
	},
}));

const Article = (props) => {
	// states
	const classes = useStyles();
	const [articleData, setArticleData] = useState();
	const [isUserArticle, setUserArticle] = useState();
	const [isDeleted, setDeleted] = useState(false);
	// get article
	useEffect(() => {
		try {
			Axios.get(`/api/articles/show/${props.match.params.id}`).then(
				(response) => {
					// set state with fetched article
					setArticleData(response.data);

					//check if article belongs to user
					if (response.data.article.user === props.user.id) {
						setUserArticle(true);
					}
				}
			);
		} catch (error) {
			window.location.href = `/404`;
		}
	}, [props.match.params.id, props.user.id]);

	const handleDelete = () => {
		// delete article
		try {
			Axios.delete(`/api/articles/show/${props.match.params.id}`).then(
				() => {
					setDeleted(true);
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	if (isDeleted) {
		return <Redirect to='/profile' />;
	}
	return (
		<React.Fragment>
			<CssBaseline />
			{articleData ? (
				<Box m='auto' mt={5} p={5} width='70%' minWidth='40%'>
					<Grid container spacing={0}>
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
								to={`/article/${articleData.article.id}/edit`}
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
							<h1 className={classes.title}>
								{articleData.article.title}
							</h1>
							<h3>
								<a href={articleData.article.url}>Source</a>
							</h3>
						</Grid>
						<Grid item xs={4}>
							<p>Saved by:</p>
							<p>{articleData.creator.user}</p>
						</Grid>
						<Grid item xs={8}></Grid>
						<Grid item xs={4}>
							<p>Tags:</p>
							{articleData.article.tags.map((tag) => {
								return (
									<Chip
										key={tag}
										label={tag}
										component={Link}
										to={`/search/?q=${tag}`}
										size='small'
										clickable
										className={classes.chip}
									/>
								);
							})}
						</Grid>
						<Grid item xs={12}>
							<div
								dangerouslySetInnerHTML={{
									__html: articleData.article.content,
								}}
							></div>
						</Grid>
					</Grid>
				</Box>
			) : (
				<CircularProgress />
			)}
		</React.Fragment>
	);
};

export default Article;
