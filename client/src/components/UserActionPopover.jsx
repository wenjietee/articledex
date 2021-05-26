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
			Axios.put(
				`${process.env.REACT_APP_URL}api/actions/?action=unread&article=${props.id}`
			);
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
			Axios.put(
				`${process.env.REACT_APP_URL}api/actions/?action=private&article=${props.id}`
			);
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
			Axios.put(
				`${process.env.REACT_APP_URL}api/actions/?action=local&article=${props.id}`
			);
			setLocal(!isLocal);
		} catch (error) {
			alert(
				`Error ${error.response.status}: ${error.response.data.detail}`
			);
		}
	};
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
						<PlaylistAddCheckIcon fontSize='default' />
					) : (
						<SubjectIcon fontSize='default' />
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
