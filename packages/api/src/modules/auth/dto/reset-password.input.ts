import { Field, InputType, Int } from '@nestjs/graphql';
import { ResetPasswordSchema } from '@todo-graphql/common';

@InputType()
export class ResetPasswordInput extends ResetPasswordSchema {
	@Field()
	readonly email: string;

	@Field(() => Int)
	readonly passwordChangeCode: number;

	@Field()
	readonly password: string;

	@Field()
	readonly passwordConfirm: string;
}
