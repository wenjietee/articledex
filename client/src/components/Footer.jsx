import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// footer styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
	},
	home: {
		textDecoration: 'none',
		color: '#000000',
	},
}));

// footer component
const Footer = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<AppBar position='static' color='transparent' elevation={0}>
				<Toolbar>
					<Typography variant='body2' className={classes.title}>
						© 2021 Article Dex
					</Typography>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Footer;
