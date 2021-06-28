import React from 'react';

import { Loader } from '@components';

import useStyles from './styled';

export const InitialPage: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Loader size={60} />
		</div>
	);
};
