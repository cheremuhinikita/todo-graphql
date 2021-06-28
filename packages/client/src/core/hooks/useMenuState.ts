import { Nullable } from '@core/types';
import React from 'react';

type AnchorEl = Nullable<HTMLElement>;

interface IUseMenuStateReturn {
	anchorEl: AnchorEl;
	isMenuOpen: boolean;
	handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
	handleMenuClose: () => void;
}

export const useMenuState = (): IUseMenuStateReturn => {
	const [anchorEl, setAnchorEl] = React.useState<AnchorEl>(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = (): void => {
		setAnchorEl(null);
	};

	return {
		anchorEl,
		isMenuOpen,
		handleMenuOpen,
		handleMenuClose,
	};
};
