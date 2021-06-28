import React from 'react';

import { IAsync } from '@core/interfaces';

import { Loader } from '../Loader';
import useStyles from './styled';

interface IProps<T> extends IAsync<T> {
	children: React.ReactNode;
	strictMode?: boolean;
	className?: string;
}

export function Async<T>({
	children,
	strictMode = false,
	execute,
	data,
	loading,
	className,
}: IProps<T>): React.ReactElement {
	const classes = useStyles();
	const condition1 = strictMode ? true : !data;
	const condition2 = strictMode ? data === null || loading : data === null && loading;

	React.useEffect(() => {
		if (condition1) execute();
	}, []);

	if (condition2)
		return (
			<div className={classes.loader}>
				<Loader size={40} />
			</div>
		);

	return <div className={className}>{children}</div>;
}
