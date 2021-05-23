import React from 'react';

const ArticleCard = (props) => {
	return (
		<React.Fragment>
			<h1>{props.article.title}</h1>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</React.Fragment>
	);
};

export default ArticleCard;
