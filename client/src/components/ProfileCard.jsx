import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
const useStyles = makeStyles({
	root: {
		minWidth: 200,
		maxWidth: 300,
		width: '100%',
		marginTop: 30,
		textAlign: 'center',
	},
	listItem: {
		textDecoration: 'none',
		color: '#268ede',
	},
	image: {
		height: '100px',
		width: '100px',
		objectFit: 'cover',
	},
});

const ProfileCard = (props) => {
	const classes = useStyles();

	return (
		<Card raised className={classes.root}>
			<List className={classes.root}>
				<ListItem>
					<Avatar
						alt='Profile'
						src={props.profile.image}
						className={classes.image}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary={props.username} />
				</ListItem>
				<ListItem>
					<ListItemText
						primary={`Save Articles: ${props.userArticles}`}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={`Unread Articles: ${props.unreads}`}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary={`Local Articles: ${props.locals}`} />
				</ListItem>
				<ListItem>
					<ListItemText primary={`Liked Articles: ${props.likes}`} />
				</ListItem>
				<ListItem>
					<ListItemText
						primary={`Bio: ${props.profile.description}`}
					/>
				</ListItem>
				<ListItem>
					<Button
						variant='contained'
						color='primary'
						disableElevation={true}
						component={Link}
						to='/profile/edit'
					>
						EDIT PROFILE
					</Button>
				</ListItem>
			</List>
		</Card>
	);
};

export default ProfileCard;
