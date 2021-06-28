import React from 'react';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { Block } from '@components';
import { IBaseCardProps } from '@core/interfaces';

import { ITodoModel } from '@modules/todo';

import useStyles from './styled';

interface IProps extends IBaseCardProps<ITodoModel> {
	full?: boolean;
}

export const Todo: React.FC<IProps> = ({
	full = true,
	model: { title, description },
	component: Component = Block,
}) => {
	const classes = useStyles();

	return (
		<Component>
			<ListItem className={clsx(full && classes.full)}>
				<ListItemText primary={title} secondary={description} />
			</ListItem>
		</Component>
	);
};
