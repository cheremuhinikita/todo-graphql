import React from 'react';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';

import { useBoolState } from '@core/hooks';

import useStyles from './styled';
import { DrawerList, Profile, Toolbar, Drawer } from './components';

interface IProps {
	children: NonNullable<React.ReactNode>;
}

export const Layout: React.FC<IProps> = ({ children }) => {
	const classes = useStyles();
	const { isOpen, handleBoolOpen, handleBoolClose } = useBoolState();

	return (
		<div className={classes.root}>
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, isOpen && classes.appBarShift)}
			>
				<Toolbar isOpenDrawer={isOpen} onDrawerOpen={handleBoolOpen}>
					<Profile />
				</Toolbar>
			</AppBar>
			<Drawer isOpen={isOpen} onDrawerClose={handleBoolClose}>
				<DrawerList />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					{children}
				</Container>
			</main>
		</div>
	);
};
