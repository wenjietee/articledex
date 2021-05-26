import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UserActionPopover from './UserActionPopover';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		width: 700,
		marginTop: 30,
	},
	title: {
		marginTop: '-3.5em',
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
	// states
	const classes = useStyles();
	const [isLiked, setLike] = useState();

	// check if user liked article
	useEffect(() => {
		if (props.article.article_likes.includes(props.username)) {
			setLike(true);
		}
	}, [props.article.article_likes, props.username]);

	// toggle like
	const likeArticle = () => {
		try {
			Axios.post(
				`${process.env.REACT_APP_URL}api/articles/like/${props.article.id}`
			).then(() => {
				setLike(!isLiked);
			});
		} catch (error) {
			console.log(error);
		}
	};

	// toggle unlike
	const unlikeArticle = () => {
		try {
			Axios.delete(
				`${process.env.REACT_APP_URL}api/articles/like/${props.article.id}`
			);
			setLike(!isLiked);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card raised className={classes.root}>
			{props.isProfilePage ? (
				<UserActionPopover
					id={props.article.id}
					isUnread={props.isUnread}
					isPrivate={props.isPrivate}
					isLocal={props.isLocal}
				/>
			) : undefined}
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
						<Typography
							variant='h5'
							component='h2'
							className={classes.title}
						>
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
				{isLiked ? (
					<IconButton
						aria-label='add to favorites'
						onClick={unlikeArticle}
					>
						<FavoriteIcon color='secondary' />
					</IconButton>
				) : (
					<IconButton
						aria-label='add to favorites'
						onClick={likeArticle}
					>
						<FavoriteIcon color='action' />
					</IconButton>
				)}

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
