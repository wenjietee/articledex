import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		minwidth: 600,
	},
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
	const [article, setArticle] = useState();
	const [isUserArticle, setUserArticle] = useState();
	const [isDeleted, setDeleted] = useState(false);
	// get article
	useEffect(() => {
		try {
			Axios.get(
				`${process.env.REACT_APP_URL}api/articles/show/${props.match.params.id}`
			).then((response) => {
				// set state with fetched article
				setArticle(response.data);

				//check if article belongs to user
				if (response.data.user === props.user.username) {
					setUserArticle(true);
				}
			});
		} catch (error) {
			window.location.href = `/404`;
		}
	}, [props.match.params.id, props.user.username]);

	const handleDelete = () => {
		// delete article
		try {
			Axios.delete(
				`${process.env.REACT_APP_URL}api/articles/show/${props.match.params.id}`
			);
			setDeleted(true);
		} catch (error) {
			console.log(error);
		}
	};
	if (isDeleted) {
		return <Redirect to='/home' />;
	}
	return (
		<React.Fragment>
			<CssBaseline />
			{article ? (
				<Box mt={1} p={10} width='75%' minWidth='50%'>
					<Grid container spacing={3} className={classes.root}>
						<Grid item xs={12}>
							<img src={article.image} alt='article' />
						</Grid>
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
							<h1 className={classes.title}>{article.title}</h1>
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
