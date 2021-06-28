import { Field, InputType } from '@nestjs/graphql';

import { LoginSchema } from '@todo-graphql/common';

@InputType()
export class LoginInput extends LoginSchema {
	@Field()
	readonly username: string;

	@Field()
	readonly password: string;
}
