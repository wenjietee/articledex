import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SubjectIcon from '@material-ui/icons/Subject';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const UserActionPopover = (props) => {
	// states
	const [anchorEl, setAnchorEl] = useState(null);
	const [isUnread, setUnread] = useState();
	const [isPrivate, setPrivate] = useState();
	const [isLocal, setLocal] = useState();

	// toggle popover
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// set states for article unread, private, local statuses
	useEffect(() => {
		setUnread(props.isUnread);
		setPrivate(props.isPrivate);
		setLocal(props.isLocal);
	}, [props.isUnread, props.isPrivate, props.isLocal]);

	// toggle unread
	const toggleUnread = () => {
		try {
			Axios.put(`/api/actions/?action=unread&article=${props.id}`);
			setUnread(!isUnread);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};

	// toggle private
	const togglePrivate = () => {
		try {
			Axios.put(`/api/actions/?action=private&article=${props.id}`);
			setPrivate(!isPrivate);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};

	// toggle local
	const toggleLocal = () => {
		try {
			// set local
			Axios.put(`/api/actions/?action=local&article=${props.id}`).then();
			setLocal(!isLocal);

			// cache data if set to true else remove data from cache
			if (!isLocal) {
				// store article

				// local storage
				try {
					// fetched article data
					Axios.get(`/api/articles/show/${props.id}`).then(
						(response) => {
							localStorage.setItem(
								props.id,
								JSON.stringify(response.data)
							);
						}
					);
				} catch (error) {
					console.log(error);
				}

				// create cache
				// caches.open(`local-article-${props.id}`).then((cache) => {
				// 	try {
				// 		// fetched article data
				// 		Axios.get(`/api/articles/show/${props.id}`).then(
				// 			(response) => {
				// 				// cache the data
				// 				cache.put(
				// 					`article/${props.id}`,
				// 					new Response(JSON.stringify(response.data))
				// 				);
				// 			}
				// 		);
				// 	} catch (error) {
				// 		console.log(error);
				// 	}
				// });
			} else {
				// delete cache
				// caches.delete(`local-article-${props.id}`);

				// delete localSotrage item
				localStorage.removeItem(props.id);
			}
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};
	// caches.match(`local-article-${props.id}`).then((item) => {
	// 	console.log('item', item);
	// });

	return (
		<React.Fragment>
			<IconButton
				aria-describedby={id}
				color='primary'
				onClick={handleClick}
			>
				<MoreHorizIcon fontSize='large' />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<IconButton
					aria-describedby={id}
					color='primary'
					onClick={toggleUnread}
				>
					{isUnread ? (
						<SubjectIcon fontSize='default' />
					) : (
						<PlaylistAddCheckIcon fontSize='default' />
					)}
				</IconButton>
				<IconButton
					aria-describedby={id}
					color='primary'
					onClick={togglePrivate}
				>
					{isPrivate ? (
						<VisibilityOffIcon fontSize='default' />
					) : (
						<VisibilityIcon fontSize='default' />
					)}
				</IconButton>
				<IconButton
					aria-describedby={id}
					color='primary'
					onClick={toggleLocal}
				>
					{isLocal ? (
						<PublishIcon fontSize='default' />
					) : (
						<GetAppIcon fontSize='default' />
					)}
				</IconButton>
			</Popover>
		</React.Fragment>
	);
};

export default UserActionPopover;
