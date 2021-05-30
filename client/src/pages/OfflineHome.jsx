import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// offline home page component
const OfflineHome = (props) => {
	return (
		<React.Fragment>
			<CssBaseline />
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'
			>
				<Container fixed align='center'>
					<h1>Looks like you are offline.</h1>
					<h1>
						We've loaded the articles you've save locally in the
						mean time.
					</h1>
				</Container>
			</Box>
			;
		</React.Fragment>
	);
};

export default OfflineHome;
