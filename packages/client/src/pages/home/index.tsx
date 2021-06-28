import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import useStyles from './styled';

export const HomePage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	return (
		<div>
			<Typography component="h1" variant="h2" className={classes.title}>
				Приложение ToDo
			</Typography>
			<Typography component="h2" variant="h5" className={classes.subtitle}>
				Создавайте, редактируйте и удаляйте ваши ToDo
			</Typography>
		</div>
	);
};
