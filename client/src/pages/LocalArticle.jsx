import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	chip: {
		marginRight: 5,
	},
	title: {
		marginTop: '0.5em',
	},
	content: {
		minWidth: 275,
		'& img': {
			[theme.breakpoints.up('xs')]: {
				width: '100%',
				objectFit: 'contain',
			},
		},
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
			<Container fixed>
				{articleData ? (
					<Box m='auto' mt={5} p={5} minWidth='40%'>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={10} lg={8}>
								<h1 className={classes.title}>
									{articleData.article.title}
								</h1>
								<h3>
									<a href={articleData.article.url}>Source</a>
								</h3>
							</Grid>
							<Grid item xs={12} sm={6} lg={4}>
								<p>Saved by:</p>
								<p>{articleData.creator.user}</p>
							</Grid>
							<Grid item xs={12} sm={10} lg={8}></Grid>
							<Grid item xs={12} sm={6} lg={4}>
								<p>Tags:</p>
								{articleData.article.tags.map((tag) => {
									return (
										<Chip
											key={tag}
											label={tag}
											size='small'
											className={classes.chip}
										/>
									);
								})}
							</Grid>
							<Grid item xs={12} lg={12}>
								<div
									className={classes.content}
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
			</Container>
		</React.Fragment>
	);
};

export default LocalArticle;
