import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

// header styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		margin: theme.spacing(0, 2),
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},

		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	headerButton: {
		margin: theme.spacing(0, 1),
		width: '100%',
		[theme.breakpoints.up('lg')]: {
			width: '8em',
		},
	},

	home: {
		textDecoration: 'none',
		color: '#ffffff',
	},

	other: {
		textDecoration: 'none',
		color: '#000000',
	},
}));

// header component
const HeaderProtected = (props) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<AppBar position='static'>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						<Link to='/home' className={classes.home}>
							ARTICLE DEX
						</Link>
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>

					<Button
						variant='contained'
						disableElevation={true}
						className={classes.headerButton}
						startIcon={<AddIcon />}
					>
						ADD
					</Button>
					<Button
						variant='contained'
						disableElevation={true}
						className={classes.headerButton}
						startIcon={<AccountCircleIcon />}
					>
						PROFILE
					</Button>
					<Button
						variant='contained'
						disableElevation={true}
						className={classes.headerButton}
						onClick={props.logout}
					>
						LOGOUT
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default HeaderProtected;
