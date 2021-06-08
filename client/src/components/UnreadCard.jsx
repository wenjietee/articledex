import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		position: 'sticky',
		top: '1rem',
		marginTop: 30,
	},
	listItem: {
		textDecoration: 'none',
		color: '#268ede',
	},
});

const UnreadCard = (props) => {
	const classes = useStyles();
	return (
		<Card raised className={classes.root} elevation={15}>
			<List component='nav' aria-label='mailbox folders'>
				<ListItem>
					<ListItemText
						primary={`Unread Articles (${props.unreads.length})`}
					/>
				</ListItem>

				<Divider />
				{props.unreads.map((unread) => {
					return (
						<Link
							to={`/article/${unread.article.id}`}
							className={classes.listItem}
							key={unread.id}
						>
							<ListItem button divider>
								<ListItemText primary={unread.article.title} />
							</ListItem>
						</Link>
					);
				})}
			</List>
		</Card>
	);
};

export default UnreadCard;
