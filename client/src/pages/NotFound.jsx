import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const NotFound = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Box pt={20}>
				<Container fixed align='center'>
					<Typography variant='h2' gutterBottom>
						<strong>Oops!</strong>
					</Typography>

					<Typography variant='h4' color='error' gutterBottom>
						<span>
							<strong>404:</strong>
							<small className='text-muted '>
								{' '}
								Page not found.
							</small>
						</span>
					</Typography>

					<Typography variant='h5' gutterBottom>
						Let's get you back.
					</Typography>
					<Box pt={3}>
						<Button
							variant='contained'
							color='primary'
							href='/home'
						>
							Back to Home
						</Button>
					</Box>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default NotFound;
