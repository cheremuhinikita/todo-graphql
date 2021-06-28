import { Role } from '@common/enums';

import { CreateOrUpdateUser } from '@modules/users/types';

export const DATA_USERS: CreateOrUpdateUser[] = [
	{
		email: 'admin@gmail.com',
		username: 'admin',
		password: 'qwerty',
		role: Role.ADMIN,
	},
	{
		email: 'user@gmail.com',
		username: 'user',
		password: 'qwerty',
		role: Role.USER,
	},
];
