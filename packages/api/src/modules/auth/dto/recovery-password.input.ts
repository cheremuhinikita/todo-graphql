import { Field, InputType } from '@nestjs/graphql';
import { RecoveryPasswordSchema } from '@todo-graphql/common';

@InputType()
export class RecoveryPasswordInput extends RecoveryPasswordSchema {
	@Field()
	readonly email: string;
}
