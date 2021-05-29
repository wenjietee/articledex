import React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

// landing page styles
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing(2, 1),
		width: '50%',

		[theme.breakpoints.up('lg')]: {
			width: '30%',
		},
	},
}));

// landing page component
const Landing = (props) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			{window.navigator.onLine ? (
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					minHeight='50vh'
				>
					<Container fixed align='center'>
						<h1>No time to read? Save 'em Read later!</h1>
						<div>
							<Button
								color='primary'
								variant='contained'
								size='large'
								component={Link}
								to='/login'
								className={classes.button}
							>
								SIGN IN
							</Button>
						</div>
						<div>
							<Button
								color='primary'
								variant='contained'
								size='large'
								component={Link}
								to='/register'
								className={classes.button}
							>
								SIGN UP
							</Button>
						</div>
					</Container>
				</Box>
			) : (
				<div>Offline Placeholder</div>
			)}
		</React.Fragment>
	);
};

export default Landing;
