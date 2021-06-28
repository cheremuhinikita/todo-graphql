import client from '@core/apollo';
import { BaseCrudService } from '@core/services';

import {
	CreateOrUpdateUserInput,
	CreateUserDocument,
	CreateUserMutation,
	CreateUserMutationVariables,
	FindAllUsersDocument,
	FindAllUsersQuery,
	FindAllUsersQueryVariables,
	FindOneUserDocument,
	FindOneUserQuery,
	FindOneUserQueryVariables,
	FindTodoDocument,
	FindTodoQuery,
	FindTodoQueryVariables,
	RemoveUserDocument,
	RemoveUserMutation,
	RemoveUserMutationVariables,
	UpdateUserDocument,
	UpdateUserMutation,
	UpdateUserMutationVariables,
} from '@gql';
import { ITodoModel } from '@modules/todo/interfaces';

import { IFullUserModel, IUserModel } from '../interfaces';

export class UsersService extends BaseCrudService<IUserModel, CreateOrUpdateUserInput> {
	public async create(input: CreateOrUpdateUserInput): Promise<IUserModel> {
		const { data } = await client.mutate<CreateUserMutation, CreateUserMutationVariables>({
			mutation: CreateUserDocument,
			variables: {
				input,
			},
		});
		const { createUser } = data as CreateUserMutation;

		return createUser;
	}

	public async findAll(isNetworkOnly = false): Promise<IFullUserModel[]> {
		const { data } = await client.query<FindAllUsersQuery, FindAllUsersQueryVariables>({
			query: FindAllUsersDocument,
			fetchPolicy: isNetworkOnly ? 'network-only' : 'cache-first',
		});
		const { users } = data as FindAllUsersQuery;

		return users;
	}

	public async findOne(id: number): Promise<IUserModel> {
		const { data } = await client.query<FindOneUserQuery, FindOneUserQueryVariables>({
			query: FindOneUserDocument,
			variables: {
				id,
			},
		});
		const { user } = data as FindOneUserQuery;

		return user;
	}

	public async findTodo(id: number): Promise<ITodoModel[]> {
		const { data } = await client.query<FindTodoQuery, FindTodoQueryVariables>({
			query: FindTodoDocument,
			variables: {
				id,
			},
		});
		const {
			user: { todo },
		} = data as FindTodoQuery;

		return todo;
	}

	public async update(id: number, input: CreateOrUpdateUserInput): Promise<IUserModel> {
		const { data } = await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
			mutation: UpdateUserDocument,
			variables: {
				id,
				input,
			},
		});
		const { updateUser } = data as UpdateUserMutation;

		return updateUser;
	}

	public async remove(id: number): Promise<boolean> {
		const { data } = await client.mutate<RemoveUserMutation, RemoveUserMutationVariables>({
			mutation: RemoveUserDocument,
			variables: {
				id,
			},
		});
		const { removeUser } = data as RemoveUserMutation;

		return removeUser;
	}
}

export const usersService = new UsersService();
