import { IBaseModel } from '@common/interfaces';

import { IUser } from '@modules/users/interfaces/user.interface';

export interface ITodo extends IBaseModel {
	title: string;
	description: string;
	user: IUser;
}
