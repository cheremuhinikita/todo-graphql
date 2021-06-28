import client from '@core/apollo';
import { BaseCrudService } from '@core/services';

import {
	CreateOrUpdateTodoInput,
	CreateTodoDocument,
	CreateTodoMutation,
	CreateTodoMutationVariables,
	FindAllTodoDocument,
	FindAllTodoQuery,
	FindAllTodoQueryVariables,
	FindOneTodoDocument,
	FindOneTodoQuery,
	FindOneTodoQueryVariables,
	RemoveTodoDocument,
	RemoveTodoMutation,
	RemoveTodoMutationVariables,
	UpdateTodoDocument,
	UpdateTodoMutation,
	UpdateTodoMutationVariables,
} from '@gql';

import { ITodoModel } from '../interfaces';

export class TodoService extends BaseCrudService<ITodoModel, CreateOrUpdateTodoInput> {
	public async create(input: CreateOrUpdateTodoInput): Promise<ITodoModel> {
		const { data } = await client.mutate<CreateTodoMutation, CreateTodoMutationVariables>({
			mutation: CreateTodoDocument,
			variables: {
				input,
			},
		});
		const { createTodo } = data as CreateTodoMutation;

		return createTodo;
	}

	public async findAll(isNetworkOnly = false): Promise<ITodoModel[]> {
		const { data } = await client.query<FindAllTodoQuery, FindAllTodoQueryVariables>({
			query: FindAllTodoDocument,
			fetchPolicy: isNetworkOnly ? 'network-only' : 'cache-first',
		});
		const { todos } = data as FindAllTodoQuery;

		return todos;
	}

	public async findOne(id: number): Promise<ITodoModel> {
		const { data } = await client.query<FindOneTodoQuery, FindOneTodoQueryVariables>({
			query: FindOneTodoDocument,
			variables: {
				id,
			},
		});
		const { todo } = data as FindOneTodoQuery;

		return todo;
	}

	public async update(id: number, input: CreateOrUpdateTodoInput): Promise<ITodoModel> {
		const { data } = await client.mutate<UpdateTodoMutation, UpdateTodoMutationVariables>({
			mutation: UpdateTodoDocument,
			variables: {
				id,
				input,
			},
		});
		const { updateTodo } = data as UpdateTodoMutation;

		return updateTodo;
	}

	public async remove(id: number): Promise<boolean> {
		const { data } = await client.mutate<RemoveTodoMutation, RemoveTodoMutationVariables>({
			mutation: RemoveTodoDocument,
			variables: {
				id,
			},
		});
		const { removeTodo } = data as RemoveTodoMutation;

		return removeTodo;
	}
}

export const todoService = new TodoService();
