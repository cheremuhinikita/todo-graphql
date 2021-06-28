import React from 'react';

interface IUseBoolStateReturn {
	isOpen: boolean;
	handleBoolOpen: () => void;
	handleBoolClose: () => void;
	handleBoolToggle: () => void;
}

export const useBoolState = (initialOpen = false): IUseBoolStateReturn => {
	const [isOpen, setIsOpen] = React.useState<boolean>(initialOpen);

	const handleBoolOpen = (): void => {
		setIsOpen(true);
	};

	const handleBoolClose = (): void => {
		setIsOpen(false);
	};

	const handleBoolToggle = (): void => {
		setIsOpen(!isOpen);
	};

	return { isOpen, handleBoolOpen, handleBoolClose, handleBoolToggle };
};
