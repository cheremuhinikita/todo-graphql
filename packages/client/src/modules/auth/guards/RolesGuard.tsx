import React from 'react';
import { useAuthContext } from '@providers';
import { Role } from '@core/enums';
import { checkRole } from '@modules/auth/utils/role';

interface IProps {
	children: React.ReactNode;
	roles: Role[];
}

export const RolesGuard: React.FC<IProps> = ({ children, roles }) => {
	const { authStatus, profile } = useAuthContext();

	return roles.length === 0 || checkRole(authStatus, profile, roles) ? <>{children}</> : null;
};
