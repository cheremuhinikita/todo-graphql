import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { PASSWORD_CHANGE_CODE_LENGTH } from '@todo-graphql/common';

import { Role } from '@common/enums';
import { BaseEntity } from '@common/entities';

import { IUser } from '../interfaces/user.interface';
import { Todo } from '@modules/todo/entities';

@Entity()
export class User extends BaseEntity implements IUser {
	@Property({ length: 256, unique: true })
	email: string;

	@Property({ length: 32, unique: true })
	username: string;

	@Property({
		length: 60,
	})
	password: string;

	@Property({
		columnType: 'integer',
		length: PASSWORD_CHANGE_CODE_LENGTH,
		nullable: true,
		hidden: true,
	})
	passwordChangeCode?: number;

	@Enum(() => Role)
	role: Role;

	@OneToMany(() => Todo, (todo: Todo) => todo.user)
	todo = new Collection<Todo>(this);
}
