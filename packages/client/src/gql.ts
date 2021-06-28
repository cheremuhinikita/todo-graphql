import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { Role } from './core/enums';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** Date custom scalar type */
	Date: string;
};

export type CreateOrUpdateTodoInput = {
	title: Scalars['String'];
	description: Scalars['String'];
};

export type CreateOrUpdateUserInput = {
	email: Scalars['String'];
	username: Scalars['String'];
	password: Scalars['String'];
	role: Scalars['String'];
};

export type LoginInput = {
	username: Scalars['String'];
	password: Scalars['String'];
};

export type LoginType = {
	__typename?: 'LoginType';
	token: Scalars['String'];
	profile: UserType;
};

export type Mutation = {
	__typename?: 'Mutation';
	createUser: UserType;
	updateUser: UserType;
	removeUser: Scalars['Boolean'];
	createTodo: TodoType;
	updateTodo: TodoType;
	removeTodo: Scalars['Boolean'];
	register: UserType;
	login: LoginType;
	recoveryPassword: Scalars['Boolean'];
	resetPassword: Scalars['Boolean'];
};

export type MutationCreateUserArgs = {
	input: CreateOrUpdateUserInput;
};

export type MutationUpdateUserArgs = {
	input: CreateOrUpdateUserInput;
	id: Scalars['Int'];
};

export type MutationRemoveUserArgs = {
	id: Scalars['Int'];
};

export type MutationCreateTodoArgs = {
	input: CreateOrUpdateTodoInput;
};

export type MutationUpdateTodoArgs = {
	input: CreateOrUpdateTodoInput;
	id: Scalars['Int'];
};

export type MutationRemoveTodoArgs = {
	id: Scalars['Int'];
};

export type MutationRegisterArgs = {
	input: RegisterInput;
};

export type MutationLoginArgs = {
	input: LoginInput;
};

export type MutationRecoveryPasswordArgs = {
	input: RecoveryPasswordInput;
};

export type MutationResetPasswordArgs = {
	input: ResetPasswordInput;
};

export type Query = {
	__typename?: 'Query';
	users: Array<UserType>;
	user: UserType;
	todos: Array<TodoType>;
	todo: TodoType;
	profile: UserType;
};

export type QueryUserArgs = {
	id: Scalars['Int'];
};

export type QueryTodoArgs = {
	id: Scalars['Int'];
};

export type RecoveryPasswordInput = {
	email: Scalars['String'];
};

export type RegisterInput = {
	email: Scalars['String'];
	username: Scalars['String'];
	password: Scalars['String'];
};

export type ResetPasswordInput = {
	email: Scalars['String'];
	passwordChangeCode: Scalars['Int'];
	password: Scalars['String'];
	passwordConfirm: Scalars['String'];
};

export { Role };

export type TodoType = {
	__typename?: 'TodoType';
	id: Scalars['Int'];
	createDate: Scalars['Date'];
	updateDate: Scalars['Date'];
	title: Scalars['String'];
	description: Scalars['String'];
	user: UserType;
};

export type UserType = {
	__typename?: 'UserType';
	id: Scalars['Int'];
	createDate: Scalars['Date'];
	updateDate: Scalars['Date'];
	email: Scalars['String'];
	username: Scalars['String'];
	role: Role;
	todo: Array<TodoType>;
};

export type LoginMutationVariables = Exact<{
	input: LoginInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
	login: { __typename?: 'LoginType' } & Pick<LoginType, 'token'> & {
			profile: { __typename?: 'UserType' } & Pick<
				UserType,
				'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
			>;
		};
};

export type RegisterMutationVariables = Exact<{
	input: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
	register: { __typename?: 'UserType' } & Pick<UserType, 'id'>;
};

export type ResetPasswordMutationVariables = Exact<{
	input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPassword'>;

export type RecoveryPasswordMutationVariables = Exact<{
	input: RecoveryPasswordInput;
}>;

export type RecoveryPasswordMutation = { __typename?: 'Mutation' } & Pick<
	Mutation,
	'recoveryPassword'
>;

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = { __typename?: 'Query' } & {
	profile: { __typename?: 'UserType' } & Pick<
		UserType,
		'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
	>;
};

export type CreateTodoMutationVariables = Exact<{
	input: CreateOrUpdateTodoInput;
}>;

export type CreateTodoMutation = { __typename?: 'Mutation' } & {
	createTodo: { __typename?: 'TodoType' } & Pick<
		TodoType,
		'id' | 'title' | 'description' | 'createDate' | 'updateDate'
	>;
};

export type UpdateTodoMutationVariables = Exact<{
	id: Scalars['Int'];
	input: CreateOrUpdateTodoInput;
}>;

export type UpdateTodoMutation = { __typename?: 'Mutation' } & {
	updateTodo: { __typename?: 'TodoType' } & Pick<
		TodoType,
		'id' | 'title' | 'description' | 'createDate' | 'updateDate'
	>;
};

export type RemoveTodoMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type RemoveTodoMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeTodo'>;

export type FindAllTodoQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllTodoQuery = { __typename?: 'Query' } & {
	todos: Array<
		{ __typename?: 'TodoType' } & Pick<
			TodoType,
			'id' | 'title' | 'description' | 'createDate' | 'updateDate'
		>
	>;
};

export type FindOneTodoQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type FindOneTodoQuery = { __typename?: 'Query' } & {
	todo: { __typename?: 'TodoType' } & Pick<
		TodoType,
		'id' | 'title' | 'description' | 'createDate' | 'updateDate'
	>;
};

export type CreateUserMutationVariables = Exact<{
	input: CreateOrUpdateUserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
	createUser: { __typename?: 'UserType' } & Pick<
		UserType,
		'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
	>;
};

export type UpdateUserMutationVariables = Exact<{
	id: Scalars['Int'];
	input: CreateOrUpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
	updateUser: { __typename?: 'UserType' } & Pick<
		UserType,
		'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
	>;
};

export type RemoveUserMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type RemoveUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeUser'>;

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllUsersQuery = { __typename?: 'Query' } & {
	users: Array<
		{ __typename?: 'UserType' } & Pick<
			UserType,
			'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
		> & { todo: Array<{ __typename?: 'TodoType' } & Pick<TodoType, 'id' | 'title'>> }
	>;
};

export type FindOneUserQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type FindOneUserQuery = { __typename?: 'Query' } & {
	user: { __typename?: 'UserType' } & Pick<
		UserType,
		'id' | 'username' | 'email' | 'role' | 'createDate' | 'updateDate'
	>;
};

export type FindTodoQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type FindTodoQuery = { __typename?: 'Query' } & {
	user: { __typename?: 'UserType' } & {
		todo: Array<
			{ __typename?: 'TodoType' } & Pick<
				TodoType,
				'id' | 'title' | 'description' | 'createDate' | 'updateDate'
			>
		>;
	};
};

export const LoginDocument = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			token
			profile {
				id
				username
				email
				role
				createDate
				updateDate
			}
		}
	}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const RegisterDocument = gql`
	mutation Register($input: RegisterInput!) {
		register(input: $input) {
			id
		}
	}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>;
export const ResetPasswordDocument = gql`
	mutation ResetPassword($input: ResetPasswordInput!) {
		resetPassword(input: $input)
	}
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
	ResetPasswordMutation,
	ResetPasswordMutationVariables
>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
	ResetPasswordMutation,
	ResetPasswordMutationVariables
>;
export const RecoveryPasswordDocument = gql`
	mutation RecoveryPassword($input: RecoveryPasswordInput!) {
		recoveryPassword(input: $input)
	}
`;
export type RecoveryPasswordMutationFn = Apollo.MutationFunction<
	RecoveryPasswordMutation,
	RecoveryPasswordMutationVariables
>;
export type RecoveryPasswordMutationResult = Apollo.MutationResult<RecoveryPasswordMutation>;
export type RecoveryPasswordMutationOptions = Apollo.BaseMutationOptions<
	RecoveryPasswordMutation,
	RecoveryPasswordMutationVariables
>;
export const ProfileDocument = gql`
	query Profile {
		profile {
			id
			username
			email
			role
			createDate
			updateDate
		}
	}
`;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const CreateTodoDocument = gql`
	mutation CreateTodo($input: CreateOrUpdateTodoInput!) {
		createTodo(input: $input) {
			id
			title
			description
			createDate
			updateDate
		}
	}
`;
export type CreateTodoMutationFn = Apollo.MutationFunction<
	CreateTodoMutation,
	CreateTodoMutationVariables
>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<
	CreateTodoMutation,
	CreateTodoMutationVariables
>;
export const UpdateTodoDocument = gql`
	mutation UpdateTodo($id: Int!, $input: CreateOrUpdateTodoInput!) {
		updateTodo(id: $id, input: $input) {
			id
			title
			description
			createDate
			updateDate
		}
	}
`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<
	UpdateTodoMutation,
	UpdateTodoMutationVariables
>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<
	UpdateTodoMutation,
	UpdateTodoMutationVariables
>;
export const RemoveTodoDocument = gql`
	mutation RemoveTodo($id: Int!) {
		removeTodo(id: $id)
	}
`;
export type RemoveTodoMutationFn = Apollo.MutationFunction<
	RemoveTodoMutation,
	RemoveTodoMutationVariables
>;
export type RemoveTodoMutationResult = Apollo.MutationResult<RemoveTodoMutation>;
export type RemoveTodoMutationOptions = Apollo.BaseMutationOptions<
	RemoveTodoMutation,
	RemoveTodoMutationVariables
>;
export const FindAllTodoDocument = gql`
	query FindAllTodo {
		todos {
			id
			title
			description
			createDate
			updateDate
		}
	}
`;
export type FindAllTodoQueryResult = Apollo.QueryResult<
	FindAllTodoQuery,
	FindAllTodoQueryVariables
>;
export const FindOneTodoDocument = gql`
	query FindOneTodo($id: Int!) {
		todo(id: $id) {
			id
			title
			description
			createDate
			updateDate
		}
	}
`;
export type FindOneTodoQueryResult = Apollo.QueryResult<
	FindOneTodoQuery,
	FindOneTodoQueryVariables
>;
export const CreateUserDocument = gql`
	mutation CreateUser($input: CreateOrUpdateUserInput!) {
		createUser(input: $input) {
			id
			username
			email
			role
			createDate
			updateDate
		}
	}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
	CreateUserMutation,
	CreateUserMutationVariables
>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
	CreateUserMutation,
	CreateUserMutationVariables
>;
export const UpdateUserDocument = gql`
	mutation UpdateUser($id: Int!, $input: CreateOrUpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			username
			email
			role
			createDate
			updateDate
		}
	}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
	UpdateUserMutation,
	UpdateUserMutationVariables
>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
	UpdateUserMutation,
	UpdateUserMutationVariables
>;
export const RemoveUserDocument = gql`
	mutation RemoveUser($id: Int!) {
		removeUser(id: $id)
	}
`;
export type RemoveUserMutationFn = Apollo.MutationFunction<
	RemoveUserMutation,
	RemoveUserMutationVariables
>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
	RemoveUserMutation,
	RemoveUserMutationVariables
>;
export const FindAllUsersDocument = gql`
	query FindAllUsers {
		users {
			id
			username
			email
			role
			createDate
			updateDate
			todo {
				id
				title
			}
		}
	}
`;
export type FindAllUsersQueryResult = Apollo.QueryResult<
	FindAllUsersQuery,
	FindAllUsersQueryVariables
>;
export const FindOneUserDocument = gql`
	query FindOneUser($id: Int!) {
		user(id: $id) {
			id
			username
			email
			role
			createDate
			updateDate
		}
	}
`;
export type FindOneUserQueryResult = Apollo.QueryResult<
	FindOneUserQuery,
	FindOneUserQueryVariables
>;
export const FindTodoDocument = gql`
	query FindTodo($id: Int!) {
		user(id: $id) {
			todo {
				id
				title
				description
				createDate
				updateDate
			}
		}
	}
`;
export type FindTodoQueryResult = Apollo.QueryResult<FindTodoQuery, FindTodoQueryVariables>;
