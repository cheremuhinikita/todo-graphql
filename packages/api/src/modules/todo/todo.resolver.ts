import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { UserContext } from '@common/decorators/requests';
import { EntityHelper } from '@common/helper';
import { Role } from '@common/enums';

import { Auth } from '@modules/auth/decorators';
import { User } from '@modules/users/entities';
import { UsersService } from '@modules/users/users.service';

import { TodoService } from './todo.service';
import { TodoType } from './models';
import { Todo } from './entities';
import { CreateOrUpdateTodoInput } from './dto';
import { UserType } from '@modules/users/models';

@Auth([Role.USER])
@Resolver(() => TodoType)
export class TodoResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly todoService: TodoService,
		private readonly entityHelper: EntityHelper,
	) {}

	@Mutation(() => TodoType)
	createTodo(
		@UserContext() user: User,
		@Args('input') createTodoInput: CreateOrUpdateTodoInput,
	): Promise<TodoType> {
		return this.todoService.create(createTodoInput, user);
	}

	@Query(() => [TodoType], { name: 'todos' })
	async findAll(@UserContext() user: User): Promise<TodoType[]> {
		return this.todoService.findAllByUser(user);
	}

	@Query(() => TodoType, { name: 'todo' })
	async findOne(
		@UserContext() user: User,
		@Args('id', { type: () => Int }) id: number,
	): Promise<TodoType> {
		return this.entityHelper.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user),
			`Todo by id #${id} does not exists`,
		);
	}

	@ResolveField(() => UserType, { name: 'user' })
	async findUser(@Parent() todo: Todo): Promise<UserType> {
		return this.usersService.findOneByTodo(todo);
	}

	@Mutation(() => TodoType)
	async updateTodo(
		@UserContext() user: User,
		@Args('id', { type: () => Int }) id: number,
		@Args('input') updateTodoInput: CreateOrUpdateTodoInput,
	): Promise<TodoType> {
		const existTodo = await this.entityHelper.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user),
			`Todo by id #${id} does not exists`,
		);

		return this.todoService.update(existTodo, updateTodoInput);
	}

	@Mutation(() => Boolean)
	async removeTodo(
		@UserContext() user: User,
		@Args('id', { type: () => Int }) id: number,
	): Promise<true> {
		const existTodo = await this.entityHelper.checkEntity(
			() => this.todoService.findOneByIdAndUser(id, user),
			`Todo by id #${id} does not exists`,
		);

		await this.todoService.remove(existTodo);

		return true;
	}
}
