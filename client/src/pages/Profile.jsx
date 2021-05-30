import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfileCard from '../components/ProfileCard';
import ArticleCard from '../components/ArticleCard';
import CircularProgress from '@material-ui/core/CircularProgress';

// profile page component
const Profile = (props) => {
	// states

	const [profile, setProfile] = useState();
	const [userArticles, setUserArticles] = useState();

	// remove localArticles
	localStorage.removeItem('localArticles');

	// get profile
	useEffect(() => {
		// get articles
		try {
			Axios.get(`/api/profile/`).then((response) => {
				// set state with article
				setProfile(response.data.profile);
				setUserArticles(response.data.user_articles);

				// store local article data
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

			<Box ml={30} mt={3}>
				<h1>My Profile</h1>
				{profile ? (
					<ProfileCard
						profile={profile.profile}
						unreads={profile.user_unreads}
						username={profile.username}
						likes={profile.user_likes}
					/>
				) : undefined}
				{userArticles ? (
					userArticles.map((article) => {
						return (
							<div key={article.id}>
								<ArticleCard
									article={article}
									username={props.user.username}
									isUnread={findArticleStatus(
										article.id,
										profile.user_unreads
									)}
									isPrivate={findArticleStatus(
										article.id,
										profile.user_privates
									)}
									isLocal={findArticleStatus(
										article.id,
										profile.user_locals
									)}
									isProfilePage={true}
								/>
							</div>
						);
					})
				) : (
					<CircularProgress />
				)}
			</Box>
		</React.Fragment>
	);
};

export default Profile;
