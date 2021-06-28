import React from 'react';

import { IProviderProps, ICrudContext } from '@core/interfaces';
import { Nullable, ValueOf } from '@core/types';
import { TODO_KEY, USERS_KEY } from '@core/constants';

import { useUsers } from '@modules/users';
import { useTodo } from '@modules/todo';

const CrudContext = React.createContext<Nullable<ICrudContext>>(null);

CrudContext.displayName = 'Crud';

export const useCrudContext = <T extends ValueOf<ICrudContext>>(
	callback: (context: ICrudContext) => T,
): T => {
	const context = React.useContext(CrudContext);
	if (context === null) throw new Error('useCrudContext must be used within CrudContext.');

	return callback(context);
};

export const CrudProvider: React.FC<IProviderProps> = ({ children }) => {
	const users = useUsers();
	const todo = useTodo();

	const value = {
		[USERS_KEY]: users,
		[TODO_KEY]: todo,
	};

	return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};
