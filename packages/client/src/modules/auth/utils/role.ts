import { AuthStatus, Role } from '@core/enums';
import { Nullable } from '@core/types';

import { IUserModel } from '@modules/users';

export const checkRole = (
	authStatus: AuthStatus,
	profile: Nullable<IUserModel>,
	roles: Role[],
): boolean =>
	authStatus === AuthStatus.AUTHORIZED && profile !== null && roles.includes(profile.role);
