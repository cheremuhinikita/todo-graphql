import { ObjectType, Field } from '@nestjs/graphql';

import { BaseType } from '@common/models';

import { ITodo } from '../interfaces';

@ObjectType()
export class TodoType extends BaseType implements Omit<ITodo, 'user'> {
	@Field()
	readonly title: string;

	@Field()
	readonly description: string;
}
