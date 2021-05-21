import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// header styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	home: {
		textDecoration: 'none',
		color: '#000000',
	},
}));

// header component
const HeaderPublic = (props) => {
	const classes = useStyles();

	let url = useLocation().pathname;

	return (
		<React.Fragment>
			<AppBar position='static' color='transparent' elevation={0}>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						<Link to='/' className={classes.home}>
							ARTICLE DEX
						</Link>
					</Typography>
					{url.includes('login') ? (
						<Button
							color='primary'
							variant='outlined'
							href='/register'
						>
							SIGN UP
						</Button>
					) : (
						<Button
							color='primary'
							variant='outlined'
							href='/login'
						>
							SIGN IN
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default HeaderPublic;
