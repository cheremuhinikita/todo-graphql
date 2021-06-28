import { Field, InputType } from '@nestjs/graphql';
import { RegisterSchema } from '@todo-graphql/common';

@InputType()
export class RegisterInput extends RegisterSchema {
	@Field()
	readonly email: string;

	@Field()
	readonly username: string;

	@Field()
	readonly password: string;
}
