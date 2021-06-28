import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import { PageUrls, Role } from '@core/enums';
import { useAuthContext } from '@providers';
import { checkRole } from '@modules/auth/utils/role';

interface IProps extends RouteProps {
	component: React.FC<RouteComponentProps>;
	roles: Role[];
}

export const RolesGuardedRoute: React.FC<IProps> = ({ component: Component, roles, ...rest }) => {
	const { authStatus, profile } = useAuthContext();

	const render = (props: RouteComponentProps): React.ReactNode =>
		checkRole(authStatus, profile, roles) ? (
			<Component {...props} />
		) : (
			<Redirect to={PageUrls.home} />
		);

	return <Route {...rest} render={render} />;
};
