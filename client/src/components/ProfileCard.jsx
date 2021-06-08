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
		maxWidth: '70%',
		position: 'sticky',
		top: '1rem',
		marginTop: 30,
		display: 'block',
	},

	image: {
		height: '120px',
		width: '120px',
		objectFit: 'cover',
		margin: 'auto',
	},
	user: {
		textAlign: 'center',
		fontSize: '5em',
	},
	button: {
		margin: 'auto',
	},
});

const ProfileCard = (props) => {
	const classes = useStyles();

	return (
		<Card raised className={classes.root} elevation={15}>
			<List>
				<ListItem>
					<Avatar
						alt='Profile'
						src={props.profile.image}
						className={classes.image}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={props.username}
						className={classes.user}
					/>
				</ListItem>
				<ListItem>
					<ListItemText
						primary={`Saved Articles: ${props.userArticles}`}
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
						className={classes.button}
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
