import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ERROR_CODE_KEY, ERRORS } from '@core/constants';
import { ExcludedErrorCodes } from '@core/types';
import { PageUrls } from '@core/enums';

import useStyles from './styled';

interface IParams {
	[ERROR_CODE_KEY]: ExcludedErrorCodes;
}

export const ErrorPage: React.FC<RouteComponentProps<IParams>> = ({ match: { params } }) => {
	const classes = useStyles();

	const code = params[ERROR_CODE_KEY];
	const { title, description } = ERRORS[code];

	return (
		<div className={classes.root}>
			<Typography component="h1" variant="h2" className={classes.title}>
				{`${code}: ${title}`}
			</Typography>
			<Typography component="h2" variant="h3" className={classes.description}>
				{description}
			</Typography>
			<Button component={Link} to={PageUrls.home} className={classes.button}>
				Вернуться на главную
			</Button>
		</div>
	);
};
