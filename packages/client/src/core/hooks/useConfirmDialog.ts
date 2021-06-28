import React from 'react';

import { ConfirmationDialog } from '@components';

import { noopFn } from '@core/utils';
import { Nullable } from '@core/types';

import { useBoolState } from './useBoolState';

interface IDialogActions {
	onAgree: () => void;
	onDisagre?: () => void;
}

export type ConfirmDialog = (newTitle: string, newActions: IDialogActions) => void;

interface IUseConfirmDialogReturn {
	Dialog: React.FC;
	confirmDialog: ConfirmDialog;
}

export const useConfirmDialog = (): IUseConfirmDialogReturn => {
	const { isOpen, handleBoolClose, handleBoolOpen } = useBoolState();
	const [title, setTitle] = React.useState<Nullable<string>>(null);
	const [dialogActions, setDialogActions] = React.useState<IDialogActions>({
		onAgree: noopFn,
	});

	const onAgree = (): void => {
		handleBoolClose();
		dialogActions.onAgree();
	};

	const onDisagre = (): void => {
		handleBoolClose();
		if (dialogActions.onDisagre) dialogActions.onDisagre();
	};

	const Dialog = React.useCallback(
		() =>
			React.createElement(ConfirmationDialog, {
				title,
				isOpen,
				onClose: handleBoolClose,
				onDisagre,
				onAgree,
			}),
		[isOpen],
	);

	const confirmDialog = React.useCallback(
		(newTitle: string, newActions: IDialogActions): void => {
			setTitle(newTitle);
			setDialogActions(newActions);
			handleBoolOpen();
		},
		[],
	);

	return {
		Dialog,
		confirmDialog,
	};
};
