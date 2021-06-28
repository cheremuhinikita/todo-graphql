import { toast } from 'react-toastify';

import { IAsync } from '@core/interfaces';
import {
	MESSAGE_SUCCESS_CREATE_USER,
	MESSAGE_SUCCESS_DELETE_USER,
	MESSAGE_SUCCESS_UPDATE_USER,
} from '@core/constants';
import { IUseCrudReturn, useCrud } from '@core/hooks';
import { useAsync } from '@core/hooks/useAsync';

import { ITodoModel } from '@modules/todo/interfaces';

import { CreateOrUpdateUserInput } from '@gql';

import { usersService, UsersService } from '../services';
import { IUserModel } from '../interfaces';

export interface IUseUsersReturn extends IUseCrudReturn<IUserModel, CreateOrUpdateUserInput> {
	findTodo: IAsync<ITodoModel[], [number]>;
}

export const useUsers = (): IUseUsersReturn => {
	const onCreate = () => {
		toast(MESSAGE_SUCCESS_CREATE_USER);
	};

	const onUpdate = () => {
		toast(MESSAGE_SUCCESS_UPDATE_USER);
	};

	const onRemove = () => {
		toast(MESSAGE_SUCCESS_DELETE_USER);
	};

	const crud = useCrud<IUserModel, CreateOrUpdateUserInput, UsersService>({
		service: usersService,
		onCreate,
		onUpdate,
		onRemove,
	});

	const findTodo = useAsync((id: number) => usersService.findTodo(id));

	return {
		findTodo,
		...crud,
	};
};
