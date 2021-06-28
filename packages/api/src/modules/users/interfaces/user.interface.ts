import { Collection } from '@mikro-orm/core';

import { IBaseModel } from '@common/interfaces';
import { Role } from '@common/enums';

import { ITodo } from '@modules/todo/interfaces';

export interface IUser extends IBaseModel {
	email: string;
	username: string;
	password: string;
	passwordChangeCode?: number;
	role: Role;
	todo: Collection<ITodo, unknown>;
}
