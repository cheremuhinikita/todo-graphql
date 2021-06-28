import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import { AuthStatus, PageUrls } from '@core/enums';
import { useAuthContext } from '@providers';

interface IProps extends RouteProps {
	component: React.FC<RouteComponentProps>;
}

export const GuestGuardedRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
	const { authStatus } = useAuthContext();

	const render = (props: RouteComponentProps): React.ReactNode =>
		authStatus === AuthStatus.UNAUTHORIZED ? (
			<Component {...props} />
		) : (
			<Redirect to={PageUrls.home} />
		);

	return <Route {...rest} render={render} />;
};
