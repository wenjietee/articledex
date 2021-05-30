import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const LocalArticle = (props) => {
	// states
	const classes = useStyles();
	const [articleData, setArticleData] = useState();
	// get article
	useEffect(() => {
		try {
			setArticleData(
				JSON.parse(
					localStorage.getItem(`article-${props.match.params.id}`)
				)
			);
		} catch (error) {
			window.location.href = `/404`;
		}
	}, [props.match.params.id]);
	console.log(articleData);
	return (
		<React.Fragment>
			<CssBaseline />
			{articleData ? (
				<Box mt={1} p={10} width='75%' minWidth='50%'>
					<Grid container spacing={3} className={classes.root}>
						<Grid item xs={12}>
							<img
								src={articleData.article.image}
								alt='article'
							/>
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

export default LocalArticle;
