import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { User } from '@modules/users/entities';

import { Todo } from './entities';
import { CreateOrUpdateTodo } from './types';

@Injectable()
export class TodoService {
	constructor(@InjectRepository(Todo) private readonly todoRepository: EntityRepository<Todo>) {}

	public async create(newTodo: CreateOrUpdateTodo, user: User): Promise<Todo> {
		const createdTodo = this.todoRepository.create({
			...newTodo,
			user: user.id,
		});
		await this.todoRepository.persistAndFlush(createdTodo);

		return createdTodo;
	}

	public async findAllByUser(user: User): Promise<Todo[]> {
		return this.todoRepository.find({ user: user.id });
	}

	public async findOneByIdAndUser(id: number, user: User): Promise<Todo> {
		return this.todoRepository.findOne({ id, user: user.id });
	}

	public async update(todo: Todo, updates: CreateOrUpdateTodo): Promise<Todo> {
		const updatedTodo = this.todoRepository.assign(todo, updates);
		await this.todoRepository.persistAndFlush(updatedTodo);

		return updatedTodo;
	}

	public async remove(todo: Todo): Promise<void> {
		await this.todoRepository.removeAndFlush(todo);
	}
}
