import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PASSWORD_CHANGE_CODE_LENGTH } from '@todo-graphql/common';

import { compareHash, generateRandomCode } from '@common/utils';

import { Todo } from '@modules/todo/entities';

import { User } from './entities';
import { CreateOrUpdateUser } from './types';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly usersRepository: EntityRepository<User>) {}

	public async create(newUser: CreateOrUpdateUser): Promise<User> {
		const createdUser = this.usersRepository.create(newUser);
		await this.usersRepository.persistAndFlush(createdUser);

		return createdUser;
	}

	public async findAll(): Promise<User[]> {
		return this.usersRepository.findAll();
	}

	public async findOneById(id: number): Promise<User> {
		return this.usersRepository.findOne({ id });
	}

	public async findOneByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ email });
	}

	public async findOneByUsername(username: string): Promise<User> {
		return this.usersRepository.findOne({ username });
	}

	public async findOneByPasswordChangeCodeAndEmail(
		passwordChangeCode: number,
		email: string,
	): Promise<User> {
		return this.usersRepository.findOne({ passwordChangeCode, email });
	}

	public async findOneByTodo(todo: Todo): Promise<User> {
		return this.usersRepository.findOne({ todo: todo.id });
	}

	public async update(user: User, updates: CreateOrUpdateUser): Promise<User> {
		const updatedUser = this.usersRepository.assign(user, updates);
		await this.usersRepository.persistAndFlush(updatedUser);

		return updatedUser;
	}

	public async remove(user: User): Promise<void> {
		await this.usersRepository.removeAndFlush(user);
	}

	public async checkPassword(password: string, passwordHash: string): Promise<boolean> {
		return compareHash(password, passwordHash);
	}

	public async generatePasswordChangeCode(user: User): Promise<number> {
		const passwordChangeCode = generateRandomCode(PASSWORD_CHANGE_CODE_LENGTH);
		const updatedUser = this.usersRepository.assign(user, {
			passwordChangeCode,
		});

		await this.usersRepository.persistAndFlush(updatedUser);

		return passwordChangeCode;
	}

	public async resetPassword(user: User, password: string): Promise<void> {
		const updatedUser = this.usersRepository.assign(user, {
			password,
			passwordChangeCode: null,
		});

		await this.usersRepository.persistAndFlush(updatedUser);
	}
}
