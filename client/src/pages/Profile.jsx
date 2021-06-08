import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfileCard from '../components/ProfileCard';
import ArticleCard from '../components/ArticleCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Profile = (props) => {
	// states
	const [profile, setProfile] = useState();
	const [userArticles, setUserArticles] = useState([]);

	// get profile
	useEffect(() => {
		// get articles
		try {
			Axios.get(`/api/profile/`).then((response) => {
				// filter unread data
				const filteredUnreads = [];
				response.data.profile.user_unreads.forEach((unread) => {
					if (unread.status) {
						filteredUnreads.push(unread);
					}
				});
				response.data.profile.user_unreads = filteredUnreads;

				// filter local data
				const filteredLocals = [];
				response.data.profile.user_locals.forEach((unread) => {
					if (unread.status) {
						filteredLocals.push(unread);
					}
				});
				response.data.profile.user_locals = filteredLocals;

				// set state with article
				setProfile(response.data.profile);
				setUserArticles(response.data.user_articles);

				//store local article data
				localStorage.setItem(
					'localArticles',
					JSON.stringify(response.data.profile.user_locals)
				);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	// check user article status for unread local private
	const findArticleStatus = (id, array) => {
		let result = undefined;
		array.forEach((item) => {
			if (item.article.id === id) {
				result = item.status;
			}
		});
		return result;
	};

	return (
		<React.Fragment>
			<CssBaseline />

			<Box mt={3}>
				<Container fixed>
					<h1>My Profile</h1>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={9} md={8} lg={7}>
							<Grid container>
								<Grid item xs>
									{userArticles ? (
										userArticles.map((article) => {
											return (
												<ArticleCard
													key={article.id}
													article={article}
													username={
														props.user.username
													}
													isUnread={findArticleStatus(
														article.id,
														profile.user_unreads
													)}
													// isPrivate={findArticleStatus(
													// 	article.id,
													// 	profile.user_privates
													// )}
													isLocal={findArticleStatus(
														article.id,
														profile.user_locals
													)}
													isProfilePage={true}
												/>
											);
										})
									) : (
										<CircularProgress />
									)}
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3} md={4} lg={5}>
							{profile ? (
								<ProfileCard
									profile={profile.profile}
									userArticles={userArticles.length}
									unreads={profile.user_unreads.length}
									locals={profile.user_locals.length}
									likes={profile.user_likes.length}
									username={profile.username}
								/>
							) : undefined}
						</Grid>
					</Grid>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default Profile;
