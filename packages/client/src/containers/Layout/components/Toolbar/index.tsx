import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import MuiToolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './styled';

interface IProps {
	children: React.ReactNode;
	isOpenDrawer: boolean;
	onDrawerOpen: () => void;
}

export const Toolbar: React.FC<IProps> = ({ children, isOpenDrawer, onDrawerOpen }) => {
	const classes = useStyles();

	return (
		<MuiToolbar className={classes.toolbar}>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="open Bool"
				onClick={onDrawerOpen}
				className={clsx(
					classes.toolbarMenuButton,
					isOpenDrawer && classes.toolbarMenuButtonHidden,
				)}
			>
				<MenuIcon />
			</IconButton>
			<div className={classes.toolbarActions}>{children}</div>
		</MuiToolbar>
	);
};
