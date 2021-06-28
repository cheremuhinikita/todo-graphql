import { ObjectType, Field } from '@nestjs/graphql';

import { BaseType } from '@common/models';
import { Role } from '@common/enums';

import { IUser } from '../interfaces';

@ObjectType()
export class UserType extends BaseType implements Omit<IUser, 'password' | 'todo'> {
	@Field()
	readonly email: string;

	@Field()
	readonly username: string;

	@Field(() => Role)
	readonly role: Role;
}
