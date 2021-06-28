import { TODO_KEY, USERS_KEY } from '@core/constants';

import { useTodo } from '@modules/todo';
import { useUsers } from '@modules/users';

export interface ICrudContext {
	[USERS_KEY]: ReturnType<typeof useUsers>;
	[TODO_KEY]: ReturnType<typeof useTodo>;
}
