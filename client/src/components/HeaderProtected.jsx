import React, { useState } from 'react';
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
		display: 'flex',

		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			padding: '0.5em',
		},
	},
	title: {
		marginTop: '0.5em',
		flexGrow: 1,
		[theme.breakpoints.up('xs')]: {
			display: 'block',
		},
	},
	search: {
		marginBottom: '0.5em',
		marginTop: '0.5em',
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		margin: theme.spacing(0, 2),
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},

		width: '100%',
		[theme.breakpoints.up('lg')]: {
			width: '20em',
		},
		[theme.breakpoints.down('xs')]: {
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
		[theme.breakpoints.up('xs')]: {
			width: '100%',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	headerButton: {
		marginTop: '0.5em',
		margin: theme.spacing(0, 1),
		width: '100%',
		[theme.breakpoints.up('lg')]: {
			width: '8em',
		},
	},
	profileButton: {
		marginTop: '0.5em',
		margin: theme.spacing(0, 1),
		width: '100%',
		fontSize: '14px',
		[theme.breakpoints.up('lg')]: {
			width: '8em',
		},
	},

	home: {
		textDecoration: 'none',
		color: '#ffffff',
	},
}));

// header component
const HeaderProtected = (props) => {
	// states
	const classes = useStyles();
	const [searchVals, setSearchVals] = useState();

	// update search input values
	const updateInput = (e) => {
		e.preventDefault();
		setSearchVals(e.target.value);
	};

	return (
		<React.Fragment>
			<AppBar position='static'>
				<Toolbar className={classes.root}>
					<Typography className={classes.title} variant='h6' noWrap>
						<Link to='/home' className={classes.home}>
							ARTICLE DEX
						</Link>
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}></div>
						<InputBase
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							onChange={updateInput}
						/>
					</div>
					<Button
						variant='contained'
						disableElevation={true}
						className={classes.headerButton}
						component={Link}
						to={`/search/?q=${searchVals}`}
						startIcon={<SearchIcon />}
					>
						SEARCH
					</Button>
					<Button
						variant='contained'
						disableElevation={true}
						className={classes.headerButton}
						component={Link}
						to='/article/create'
						startIcon={<AddIcon />}
					>
						ADD
					</Button>
					<Button
						variant='contained'
						disableElevation={true}
						className={classes.profileButton}
						component={Link}
						to='/profile'
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
