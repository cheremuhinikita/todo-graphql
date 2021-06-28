import { toast } from 'react-toastify';
import { CreateOrUpdateTodoInput } from '@gql';

import {
	MESSAGE_SUCCESS_CREATE_TODO,
	MESSAGE_SUCCESS_DELETE_TODO,
	MESSAGE_SUCCESS_UPDATE_TODO,
} from '@core/constants';
import { IUseCrudReturn, useCrud } from '@core/hooks';

import { TodoService, todoService } from '../services';
import { ITodoModel } from '../interfaces';

export const useTodo = (): IUseCrudReturn<ITodoModel, CreateOrUpdateTodoInput> => {
	const onCreate = () => {
		toast(MESSAGE_SUCCESS_CREATE_TODO);
	};

	const onUpdate = () => {
		toast(MESSAGE_SUCCESS_UPDATE_TODO);
	};

	const onRemove = () => {
		toast(MESSAGE_SUCCESS_DELETE_TODO);
	};

	return useCrud<ITodoModel, CreateOrUpdateTodoInput, TodoService>({
		service: todoService,
		onCreate,
		onUpdate,
		onRemove,
	});
};
