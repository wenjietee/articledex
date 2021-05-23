import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		width: 700,
		marginTop: 30,
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
	chip: {
		margin: 2,
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
					component={Link}
					to={`/article/${props.article.id}`}
				/>
			</CardActionArea>
			<CardContent>
				<Grid container spacing={3} alignItems='center'>
					<Grid item xs={9}>
						<Typography variant='h5' component='h2'>
							{props.article.title}
						</Typography>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Description:
						</Typography>
						<Typography variant='body2' component='p'>
							{props.article.description}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Saved By:
						</Typography>
						<Typography variant='body2' component='p'>
							{props.article.user}
						</Typography>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Likes:
						</Typography>
						<Typography variant='body2' component='p'>
							{props.article.article_likes.length}
						</Typography>
						<Typography
							className={classes.pos}
							color='textSecondary'
						>
							Tags:
						</Typography>

						{props.article.tags.map((tag) => {
							return (
								<Chip
									key={tag}
									label={tag}
									component='a'
									color='primary'
									size='small'
									href='#'
									clickable
									className={classes.chip}
								/>
							);
						})}
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<Button
					size='small'
					component={Link}
					color='secondary'
					to={`/article/${props.article.id}`}
				>
					View Article
				</Button>
			</CardActions>
		</Card>
	);
};

export default ArticleCard;
