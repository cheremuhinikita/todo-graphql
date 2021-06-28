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
import { stringifyObject } from '@common/utils';

import { AuthModule } from '@modules/auth/auth.module';
import { InitializerModule } from '@modules/initializer/initializer.module';
import { MikroOrmRootModule } from '@modules/mikro-orm/mikro-orm-root.module';
import { TodoModule } from '@modules/todo/todo.module';
import { UsersModule } from '@modules/users/users.module';
import { CreateOrUpdateTodo } from '@modules/todo/types';
import { TodoType } from '@modules/todo/models';
import { InitializerService } from '@modules/initializer/initializer.service';

describe('TodoController (e2e)', () => {
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
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNDUzNDc4MSwiZXhwIjoxNjI1MTM5NTgxfQ.Y2VF_GbjkTa0K4uJb0_b9pbHl2-0cxwnC_o6lWjq31s';

	const createTodo: CreateOrUpdateTodo = {
		title: 'title1',
		description: 'description1',
	};

	it('createTodo', () => {
		const createTodoInput = stringifyObject(createTodo);

		const key = 'createTodo';

		const createTodoQuery = `
			mutation {
				${key}(input: ${createTodoInput}) {
					id
					title
					description
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: createTodoQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as TodoType;

				id = data.id;

				expect(data.title).toBe(createTodo.title);
				expect(data.description).toBe(createTodo.description);
			})
			.expect(200);
	});

	it('getTodos', () => {
		const key = 'todos';

		const getTodosQuery = `
			query {
				${key} {
					id
					title
					description
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: getTodosQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as TodoType[];
				const existTodo = data.find((todo) => todo.id === id);

				expect(data.length).toBeGreaterThan(0);
				expect(existTodo.title).toBe(createTodo.title);
				expect(existTodo.description).toBe(createTodo.description);
			})
			.expect(200);
	});

	it('getTodo', () => {
		const key = 'todo';

		const getTodoQuery = `
			query {
				${key}(id: ${id}) {
					id
					title
					description
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: getTodoQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as TodoType;

				expect(data.title).toBe(createTodo.title);
				expect(data.description).toBe(createTodo.description);
			})
			.expect(200);
	});

	const updateTodo: CreateOrUpdateTodo = {
		title: 'title2',
		description: 'description2',
	};

	it('updateTodo', () => {
		const updateUserInput = stringifyObject(updateTodo);

		const key = 'updateTodo';

		const updateTodoQuery = `
			mutation {
				${key}(id: ${id}, input: ${updateUserInput}) {
					id
					title
					description
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: updateTodoQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as TodoType;

				expect(data.title).toBe(updateTodo.title);
				expect(data.description).toBe(updateTodo.description);
			})
			.expect(200);
	});

	it('removeTodo', () => {
		const key = 'removeTodo';

		const removeTodoQuery = `
			mutation {
				${key}(id: ${id})
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.set('Authorization', `Bearer ${token}`)
			.send({
				operationName: null,
				query: removeTodoQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as boolean;

				expect(data).toBeTruthy();
			})
			.expect(200);
	});
});
