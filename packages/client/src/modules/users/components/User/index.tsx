import React from 'react';

import Typography from '@material-ui/core/Typography';

import { Block } from '@components';
import { Role } from '@core/enums';
import { IBaseCardProps } from '@core/interfaces';
import { formatDate } from '@core/utils';

import { RolesGuard } from '@modules/auth';
import { IUserModel } from '@modules/users';

import useStyles from './styled';

type Props = IBaseCardProps<IUserModel>;

export const User: React.FC<Props> = ({
	model: { username, email, role, createDate, updateDate },
	component: Component = Block,
}) => {
	const classes = useStyles();

	const formatStr = 'd MMMM Y г.';
	const formattedCreateDate = formatDate(createDate, formatStr);
	const formattedUpdateDate = formatDate(updateDate, formatStr);

	return (
		<Component>
			<Typography variant="h5" component="h2">
				{username}
			</Typography>
			<Typography className={classes.title} color="textSecondary" gutterBottom>
				{email}
			</Typography>
			<RolesGuard roles={[Role.ADMIN]}>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Роль: ${role}`}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Дата создания: ${formattedCreateDate}`}
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{`Дата обновления: ${formattedUpdateDate}`}
				</Typography>
			</RolesGuard>
		</Component>
	);
};
