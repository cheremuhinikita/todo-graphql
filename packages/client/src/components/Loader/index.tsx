import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styled';

interface IProps {
	size: number;
}

export const Loader: React.FC<IProps> = ({ size }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress
				variant="determinate"
				size={size}
				thickness={4}
				value={100}
				className={classes.bottom}
			/>
			<CircularProgress
				disableShrink
				variant="indeterminate"
				size={size}
				thickness={4}
				className={classes.top}
				classes={{
					circle: classes.circle,
				}}
			/>
		</div>
	);
};
