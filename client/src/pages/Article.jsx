import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';

const Article = (props) => {
	const [article, setArticle] = useState();
	useEffect(() => {
		// fetched article
		Axios.get(
			`${process.env.REACT_APP_URL}api/articles/show/${props.match.params.id}`
		).then((response) => {
			// set state with fetched article
			setArticle(response);
		});
	}, [props.match.params.id]);

	return (
		<div>
			<pre>{JSON.stringify(article.data, null, 2)}</pre>
		</div>
	);
};

export default Article;
