import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Dashboard';
import UsersIcon from '@material-ui/icons/Group';
import TodoIcon from '@material-ui/icons/List';

import { PageUrls, Role } from '@core/enums';

import { RolesGuard } from '@modules/auth';

import useStyles from './styled';

export const DrawerList: React.FC = () => {
	const classes = useStyles();

	return (
		<List>
			<ListItem button component={RouterLink} to={PageUrls.home}>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText
					primary="Главная"
					color="secondary"
					className={classes.listItemText}
				/>
			</ListItem>
			<ListItem button component={RouterLink} to={PageUrls.users}>
				<ListItemIcon>
					<UsersIcon />
				</ListItemIcon>
				<ListItemText
					primary="Пользователи"
					color="secondary"
					className={classes.listItemText}
				/>
			</ListItem>
			<RolesGuard roles={[Role.USER]}>
				<ListItem button component={RouterLink} to={PageUrls.todo}>
					<ListItemIcon>
						<TodoIcon />
					</ListItemIcon>
					<ListItemText
						primary="Мои ToDO"
						color="secondary"
						className={classes.listItemText}
					/>
				</ListItem>
			</RolesGuard>
		</List>
	);
};
