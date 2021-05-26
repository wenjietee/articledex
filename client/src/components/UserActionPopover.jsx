import React, { useState } from 'react';
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
	const [isLocal, setLocal] = useState();
	const [isUnread, setUnread] = useState();
	const [isPrivate, setPrivate] = useState();

	// toggle popover
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// toggle unread
	const toggleUnread = () => {
		setUnread(!isUnread);
	};

	// toggle private
	const togglePrivate = () => {
		setPrivate(!isPrivate);
	};
	// toggle local

	const toggleLocal = () => {
		setLocal(!isLocal);
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
