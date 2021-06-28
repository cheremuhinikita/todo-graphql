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
import { createUniqueColumn, stringifyObject } from '@common/utils';
import { Role } from '@common/enums';

import { AuthModule } from '@modules/auth/auth.module';
import { InitializerModule } from '@modules/initializer/initializer.module';
import { MikroOrmRootModule } from '@modules/mikro-orm/mikro-orm-root.module';
import { TodoModule } from '@modules/todo/todo.module';
import { UsersModule } from '@modules/users/users.module';
import { UserType } from '@modules/users/models';
import { LoginType } from '@modules/auth/models';
import { InitializerService } from '@modules/initializer/initializer.service';

describe('AuthController (e2e)', () => {
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

	const register = {
		email: createUniqueColumn('user@gmail.com'),
		username: createUniqueColumn('user'),
		password: '123456',
	};

	it('register', () => {
		const registerInput = stringifyObject(register);

		const key = 'register';

		const registerQuery = `
			mutation {
				${key}(input: ${registerInput}) {
					id
					username
					email
					role
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				operationName: null,
				query: registerQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as UserType;

				expect(data.email).toBe(register.email);
				expect(data.username).toBe(register.username);
				expect(data.role).toBe(Role.USER);
			})
			.expect(200);
	});

	const login = {
		username: register.username,
		password: register.password,
	};

	it('login', () => {
		const loginInput = stringifyObject(login);

		const key = 'login';

		const loginQuery = `
			mutation {
				${key}(input: ${loginInput}) {
					token,
					profile {
						id
						username
						email
						role
					}
				}
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				operationName: null,
				query: loginQuery,
			})
			.expect(({ body }) => {
				const { token, profile } = body.data[key] as LoginType;

				expect(typeof token).toBe('string');
				expect(profile.username).toBe(login.username);
				expect(profile.role).toBe(Role.USER);
			})
			.expect(200);
	});

	const recoveryPassword = {
		email: register.email,
	};

	it('recoveryPassword', () => {
		const recoveryPasswordInput = stringifyObject(recoveryPassword);

		const key = 'recoveryPassword';

		const recoveryPasswordQuery = `
			mutation {
				${key}(input: ${recoveryPasswordInput})
			}
		`;

		return request(app.getHttpServer())
			.post('/graphql')
			.send({
				operationName: null,
				query: recoveryPasswordQuery,
			})
			.expect(({ body }) => {
				const data = body.data[key] as boolean;

				expect(data).toBeTruthy();
			})
			.expect(200);
	});
});
