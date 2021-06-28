import { Field, InputType } from '@nestjs/graphql';

import { CreateOrUpdateTodoSchema } from '@todo-graphql/common';

import { CreateOrUpdateTodo } from '../types';

@InputType()
export class CreateOrUpdateTodoInput
	extends CreateOrUpdateTodoSchema
	implements CreateOrUpdateTodo
{
	@Field()
	readonly title: string;

	@Field()
	readonly description: string;
}
