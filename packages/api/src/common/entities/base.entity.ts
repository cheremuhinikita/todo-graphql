import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { IBaseModel } from '@common/interfaces';

@Entity({ abstract: true })
export abstract class BaseEntity implements IBaseModel {
	@PrimaryKey()
	id!: number;

	@Property()
	createDate: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updateDate: Date = new Date();
}
