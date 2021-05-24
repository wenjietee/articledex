import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';

const UnreadCard = (props) => {
	return (
		<Card raised>
			<CardHeader title='Unread Articles' />
			<CardContent>
				<ul>
					{props.unreads.user_unreads.map((unread) => {
						return (
							<li key={unread.id}>
								<Link to={`/article/${unread.article.id}`}>
									{unread.article.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</CardContent>
		</Card>
	);
};

export default UnreadCard;
