import React from 'react';

import { IProviderProps } from '@core/interfaces';

import { AuthProvider } from './AuthProvider';
import { ConfirmDialogProvider } from './ConfirmDialogProvider';
import { CrudProvider } from './CrudProvider';

export const RootProvider: React.FC<IProviderProps> = ({ children }) => (
	<AuthProvider>
		<ConfirmDialogProvider>
			<CrudProvider>{children}</CrudProvider>
		</ConfirmDialogProvider>
	</AuthProvider>
);
