import { InputType, Field } from '@nestjs/graphql';
import { CreateOrUpdateUserSchema } from '@todo-graphql/common';

import { Role } from '@common/enums';

import { CreateOrUpdateUser } from '../types';

@InputType()
export class CreateOrUpdateUserInput
	extends CreateOrUpdateUserSchema
	implements CreateOrUpdateUser
{
	@Field()
	readonly email: string;

	@Field()
	readonly username: string;

	@Field()
	readonly password: string;

	@Field(() => Role)
	readonly role: Role;
}
