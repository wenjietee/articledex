import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SubjectIcon from '@material-ui/icons/Subject';

const UserActionPopover = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

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
				<IconButton aria-describedby={id} color='primary'>
					<SubjectIcon fontSize='large' />
				</IconButton>
				<IconButton aria-describedby={id} color='primary'>
					<VisibilityIcon fontSize='large' />
				</IconButton>
				<IconButton aria-describedby={id} color='primary'>
					<SaveAltIcon fontSize='large' />
				</IconButton>
			</Popover>
		</React.Fragment>
	);
};

export default UserActionPopover;
