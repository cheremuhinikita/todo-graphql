import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MikroORM } from '@mikro-orm/core';

import {
	ConfigRootModule,
	GraphQLRootModule,
	RedisCacheModule,
	CommonModule,
} from '@common/modules';
import { Role } from '@common/enums';
import { createUniqueColumn, stringifyEnumValue, stringifyObject } from '@common/utils';

import { AuthModule } from '@modules/auth/auth.module';
import { InitializerModule } from '@modules/initializer/initializer.module';
import { MikroOrmRootModule } from '@modules/mikro-orm/mikro-orm-root.module';
import { TodoModule } from '@modules/todo/todo.module';
import { UsersModule } from '@modules/users/users.module';
import { CreateOrUpdateUser } from '@modules/users/types';
import { UserType } from '@modules/users/models';
import { InitializerService } from '@modules/initializer/initializer.service';

describe('UsersController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigRootModule,
				GraphQLRootModule,
				RedisCacheModule,
				CommonModule,
				MikroOrmRootModule,
				InitializerModule,
				UsersModule,
				AuthModule,
				TodoModule,
			],
		}).compile();

		app = moduleFixture.createNestApplication<INestApplication>();

		const initializerService = app.get(InitializerService);
		const orm = app.get(MikroORM);

		const generator = orm.getSchemaGenerator();
		await generator.updateSchema();

		await initializerService.initializeAll();

		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	let id: number;
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyNDUzNTk3MywiZXhwIjoxNjI1MTQwNzczfQ.AlZW6zEnYx4-2LqdJKkv80pmlS6SUlkq7765j5kAhdw';

	const createUser: CreateOrUpdateUser = {
		email: createUniqueColumn('user@gmail.com'),
		username: createUniqueColumn('user'),
		password: '123456',
		role: Role.ADMIN,
	};

	it('createUser', () => {
		const createUserStr = stringifyObject(createUser);
		const createUserInput = stringifyEnumValue(createUserStr, createUser.role);

		const key = 'createUser';

		const createUserQuery = `
			mutation {
				${key}(input: ${createUserInput}) {
					id
					username
					email
					role
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: createUserQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as UserType;

				id = data.id;

				expect(data.email).toBe(createUser.email);
				expect(data.username).toBe(createUser.username);
				expect(data.role).toBe(createUser.role);
			})
			.expect(200);
	});

	it('getUsers', () => {
		const key = 'users';

		const getUsersQuery = `
			query {
				${key} {
					id
					email
					username
					role
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				operationName: null,
				query: getUsersQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as UserType[];
				const existUser = data.find((user) => user.id === id);

				expect(data.length).toBeGreaterThan(0);
				expect(existUser.email).toBe(createUser.email);
				expect(existUser.username).toBe(createUser.username);
				expect(existUser.role).toBe(createUser.role);
			})
			.expect(200);
	});

	it('getUser', () => {
		const key = 'user';

		const getUserQuery = `
			query {
				${key}(id: ${id}) {
					id
					email
					username
					role
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				operationName: null,
				query: getUserQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as UserType;

				expect(data.email).toBe(createUser.email);
				expect(data.username).toBe(createUser.username);
				expect(data.role).toBe(createUser.role);
			})
			.expect(200);
	});

	const updateUser: CreateOrUpdateUser = {
		email: createUniqueColumn('user@gmail.com'),
		username: createUniqueColumn('user'),
		password: '123456',
		role: Role.ADMIN,
	};

	it('updateUser', () => {
		const updateUserStr = stringifyObject(updateUser);
		const updateUserInput = stringifyEnumValue(updateUserStr, updateUser.role);

		const key = 'updateUser';

		const updateUserQuery = `
			mutation {
				${key}(id: ${id}, input: ${updateUserInput}) {
					id
					email
					username
					role
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: updateUserQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as UserType;

				expect(data.email).toBe(updateUser.email);
				expect(data.username).toBe(updateUser.username);
				expect(data.role).toBe(updateUser.role);
			})
			.expect(200);
	});

	it('removeUser', () => {
		const key = 'removeUser';

		const updateUserQuery = `
			mutation {
				${key}(id: ${id})
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: updateUserQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as boolean;

				expect(data).toBeTruthy();
			})
			.expect(200);
	});
});
