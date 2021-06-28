import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IBaseModel } from '@common/interfaces';

@ObjectType({ isAbstract: true })
export abstract class BaseType implements IBaseModel {
	@Field(() => Int)
	id: number;

	@Field()
	createDate: Date;

	@Field()
	updateDate: Date;
}
