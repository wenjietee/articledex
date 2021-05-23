import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	media: {
		height: 140,
	},
});

const ArticleCard = (props) => {
	const classes = useStyles();

	return (
		<Card raised className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.article.image}
					title='article'
				/>
			</CardActionArea>
			<CardContent>
				<Typography variant='h5' component='h2'>
					{props.article.title}
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					Description:
				</Typography>
				<Typography variant='body2' component='p'>
					{props.article.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size='small'
					component={Link}
					to={`/article/${props.article.id}`}
				>
					Go to Article
				</Button>
			</CardActions>
		</Card>
	);
};

export default ArticleCard;
