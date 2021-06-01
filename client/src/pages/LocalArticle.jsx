import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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

const LocalArticle = (props) => {
	// states
	const classes = useStyles();
	const [articleData, setArticleData] = useState();
	// get article
	useEffect(() => {
		try {
			setArticleData(
				JSON.parse(localStorage.getItem(props.match.params.id))
			);
		} catch (error) {
			window.location.href = `/404`;
		}
	}, [props.match.params.id]);

	return (
		<React.Fragment>
			<CssBaseline />
			{articleData ? (
				<Box m='auto' p={5} width='70%' minWidth='40%'>
					<Grid container spacing={0}>
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
