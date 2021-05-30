import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// offline home page component
const OfflineHome = () => {
	const [localItems, setLocalItems] = useState();

	useEffect(() => {
		setLocalItems(JSON.parse(localStorage.getItem('localArticles')));
	}, []);

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
					<div>
						{localItems
							? localItems.map((item) => {
									return (
										<a
											href={`/article/local/${item.article.id}`}
											key={item.id}
										>
											{item.article.title}
										</a>
									);
							  })
							: undefined}
					</div>
				</Container>
			</Box>
		</React.Fragment>
	);
};

export default OfflineHome;
