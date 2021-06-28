import React from 'react';

import { ConfirmDialog, useConfirmDialog } from '@core/hooks';
import { IProviderProps } from '@core/interfaces';
import { Nullable } from '@core/types';

const ConfirmDialogContext = React.createContext<Nullable<ConfirmDialog>>(null);

ConfirmDialogContext.displayName = 'ConfirmDialog';

export const useConfirmDialogContext = (): ConfirmDialog => {
	const context = React.useContext(ConfirmDialogContext);
	if (context === null)
		throw new Error('useConfirmDialogContext must be used within ConfirmDialogContext.');

	return context;
};

export const ConfirmDialogProvider: React.FC<IProviderProps> = ({ children }) => {
	const { Dialog, confirmDialog } = useConfirmDialog();

	return (
		<ConfirmDialogContext.Provider value={confirmDialog}>
			<Dialog />
			{children}
		</ConfirmDialogContext.Provider>
	);
};
