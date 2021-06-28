import { Field, ObjectType } from '@nestjs/graphql';

import { UserType } from '@modules/users/models/user.type';

import { ILoginType } from '../interfaces';

@ObjectType()
export class LoginType implements ILoginType {
	@Field()
	token: string;

	@Field(() => UserType)
	profile: UserType;
}
