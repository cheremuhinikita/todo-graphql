import React from 'react';
import clsx from 'clsx';

import MuiDrawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from './styled';

interface IProps {
	children: React.ReactNode;
	isOpen: boolean;
	onDrawerClose: () => void;
}

export const Drawer: React.FC<IProps> = ({ children, isOpen, onDrawerClose }) => {
	const classes = useStyles();

	return (
		<MuiDrawer
			variant="permanent"
			open={isOpen}
			classes={{
				paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
			}}
		>
			<div className={classes.drawerIcon}>
				<IconButton onClick={onDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			{children}
		</MuiDrawer>
	);
};
