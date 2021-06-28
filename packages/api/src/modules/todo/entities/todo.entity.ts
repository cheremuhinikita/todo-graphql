import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from '@common/entities/base.entity';

import { User } from '@modules/users/entities/user.entity';

import { ITodo } from '../interfaces';

@Entity()
export class Todo extends BaseEntity implements ITodo {
	@Property({ length: 32 })
	title: string;

	@Property({ columnType: 'text' })
	description: string;

	@ManyToOne(() => User, { onDelete: 'cascade' })
	user: User;
}
