import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import {
	MESSAGE_ERROR_INVALID_EMAIL,
	MESSAGE_ERROR_INVALID_PASSWORD,
	MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN,
	MESSAGE_ERROR_INVALID_USERNAME,
	MESSAGE_ERROR_UNIQUE_EMAIL,
	MESSAGE_ERROR_UNIQUE_USERNAME,
} from '@todo-graphql/common';

import { EntityHelper } from '@common/helper';
import { Role } from '@common/enums';
import { IJwtPayload } from '@common/interfaces';
import { UserContext } from '@common/decorators/requests';

import { UsersService } from '@modules/users/users.service';
import { UserType } from '@modules/users/models/user.type';
import { User } from '@modules/users/entities/user.entity';

import { LoginInput, RecoveryPasswordInput, RegisterInput, ResetPasswordInput } from './dto';
import { LoginType } from './models';
import { ILoginType } from './interfaces';
import { Auth } from './decorators';

@Resolver()
export class AuthResolver {
	constructor(
		private readonly jwtService: JwtService,
		private readonly entityHelper: EntityHelper,
		private readonly usersService: UsersService,
		private readonly mailerService: MailerService,
	) {}

	@Mutation(() => UserType)
	async register(
		@Args('input') { email, username, ...registerUserInput }: RegisterInput,
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
			...registerUserInput,
			email,
			username,
			role: Role.USER,
		});
	}

	@Mutation(() => LoginType)
	async login(@Args('input') { username, password }: LoginInput): Promise<ILoginType> {
		const existUser = await this.entityHelper.checkValidEntity(
			() => this.usersService.findOneByUsername(username),
			MESSAGE_ERROR_INVALID_USERNAME,
		);

		await this.entityHelper.checkValidEntity(
			() => this.usersService.checkPassword(password, existUser.password),
			MESSAGE_ERROR_INVALID_PASSWORD,
		);

		const token = await this.jwtService.signAsync({
			userId: existUser.id,
		} as IJwtPayload);

		return {
			token,
			profile: existUser,
		};
	}

	@Auth()
	@Query(() => UserType)
	profile(@UserContext() user: User): UserType {
		return user;
	}

	@Mutation(() => Boolean)
	async recoveryPassword(@Args('input') { email }: RecoveryPasswordInput): Promise<true> {
		const existUser = await this.entityHelper.checkValidEntity(
			() => this.usersService.findOneByEmail(email),
			MESSAGE_ERROR_INVALID_EMAIL,
		);

		const passwordChangeCode = await this.usersService.generatePasswordChangeCode(existUser);

		await this.mailerService.sendMail({
			to: email,
			from: 'admin@todo.com',
			subject: 'Потверждение смены пароля',
			text: 'Смена пароля',
			html: `Код потверждения - ${passwordChangeCode}`,
		});

		return true;
	}

	@Mutation(() => Boolean)
	async resetPassword(
		@Args('input') { email, passwordChangeCode, password }: ResetPasswordInput,
	): Promise<true> {
		const existUser = await this.entityHelper.checkValidEntity(
			() => this.usersService.findOneByPasswordChangeCodeAndEmail(passwordChangeCode, email),
			MESSAGE_ERROR_INVALID_PASSWORD_CHANGE_TOKEN,
		);

		await this.usersService.resetPassword(existUser, password);

		return true;
	}
}
