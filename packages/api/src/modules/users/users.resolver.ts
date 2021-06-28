import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MESSAGE_ERROR_UNIQUE_EMAIL, MESSAGE_ERROR_UNIQUE_USERNAME } from '@todo-graphql/common';

import { EntityHelper } from '@common/helper';
import { Role } from '@common/enums';

import { Auth } from '@modules/auth/decorators';
import { TodoType } from '@modules/todo/models';
import { TodoService } from '@modules/todo/todo.service';

import { UsersService } from './users.service';
import { UserType } from './models';
import { CreateOrUpdateUserInput } from './dto';
import { User } from './entities';

@Resolver(() => UserType)
export class UsersResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly todoService: TodoService,
		private readonly entityHelper: EntityHelper,
	) {}

	@Auth([Role.ADMIN])
	@Mutation(() => UserType)
	async createUser(
		@Args('input') { email, username, ...createUserInput }: CreateOrUpdateUserInput,
	): Promise<UserType> {
		await this.entityHelper.checkUniqueEntity(
			() => this.usersService.findOneByEmail(email),
			MESSAGE_ERROR_UNIQUE_EMAIL,
		);
		await this.entityHelper.checkUniqueEntity(
			() => this.usersService.findOneByUsername(username),
			MESSAGE_ERROR_UNIQUE_USERNAME,
		);

		return this.usersService.create({
			...createUserInput,
			email,
			username,
		});
	}

	@Query(() => [UserType], { name: 'users' })
	async findAll(): Promise<UserType[]> {
		return this.usersService.findAll();
	}

	@Query(() => UserType, { name: 'user' })
	async findOne(@Args('id', { type: () => Int }) id: number): Promise<UserType> {
		return this.entityHelper.checkEntity(
			() => this.usersService.findOneById(id),
			`User by id #${id} does not exists`,
		);
	}

	@ResolveField(() => [TodoType], { name: 'todo' })
	async findTodo(@Parent() user: User): Promise<TodoType[]> {
		return this.todoService.findAllByUser(user);
	}

	@Auth([Role.ADMIN])
	@Mutation(() => UserType)
	async updateUser(
		@Args('id', { type: () => Int }) id: number,
		@Args('input') updateUserInput: CreateOrUpdateUserInput,
	): Promise<UserType> {
		const existUser = await this.entityHelper.checkEntity(
			() => this.usersService.findOneById(id),
			`User by id #${id} does not exists`,
		);

		return this.usersService.update(existUser, updateUserInput);
	}

	@Auth([Role.ADMIN])
	@Mutation(() => Boolean)
	async removeUser(@Args('id', { type: () => Int }) id: number): Promise<true> {
		const existUser = await this.entityHelper.checkEntity(
			() => this.usersService.findOneById(id),
			`User by id #${id} does not exists`,
		);

		await this.usersService.remove(existUser);

		return true;
	}
}
