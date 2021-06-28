import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginInput, RegisterInput, RecoveryPasswordInput, ResetPasswordInput } from '@gql';

import { AuthStatus, PageUrls } from '@core/enums';
import {
	MESSAGE_SUCCESS_RECOVERY_PASSWORD,
	MESSAGE_SUCCESS_REGISTER,
	TOKEN_KEY,
} from '@core/constants';
import { Nullable } from '@core/types';

import { IUserModel } from '@modules/users';
import { authService } from '../services';

export interface IUseAuthReturn {
	profile: Nullable<IUserModel>;
	authStatus: AuthStatus;
	email: string;
	checkToken: () => Promise<void>;
	login: (data: LoginInput) => Promise<void>;
	logout: () => void;
	register: (data: RegisterInput) => Promise<void>;
	recoveryPassword: (data: RecoveryPasswordInput) => Promise<boolean>;
	resetPassword: (data: ResetPasswordInput) => Promise<boolean>;
}

export const useAuth = (): IUseAuthReturn => {
	const history = useHistory();
	const [profile, setProfile] = React.useState<Nullable<IUserModel>>(null);
	const [authStatus, setAuthStatus] = React.useState<AuthStatus>(AuthStatus.INITIAL);
	const [email, setEmail] = React.useState<string>('');

	const checkToken = React.useCallback(async () => {
		try {
			const token = window.localStorage.getItem(TOKEN_KEY);

			if (token) {
				const user = await authService.profile();
				setProfile(user);
				setAuthStatus(AuthStatus.AUTHORIZED);
			} else {
				setAuthStatus(AuthStatus.UNAUTHORIZED);
			}
		} catch {
			setAuthStatus(AuthStatus.UNAUTHORIZED);
			window.localStorage.removeItem(TOKEN_KEY);
		}
	}, []);

	const login = React.useCallback(async (data: LoginInput) => {
		try {
			const res = await authService.login(data);
			window.localStorage.setItem(TOKEN_KEY, res.token);

			setProfile(res.profile);
			setAuthStatus(AuthStatus.AUTHORIZED);
		} catch (err) {
			setAuthStatus(AuthStatus.UNAUTHORIZED);
			throw err;
		}
	}, []);

	const register = React.useCallback(async (data: RegisterInput) => {
		try {
			await authService.register(data);
			history.push(PageUrls.login);
			toast(MESSAGE_SUCCESS_REGISTER);
		} catch (err) {
			throw err;
		}
	}, []);

	const logout = React.useCallback(() => {
		window.localStorage.removeItem(TOKEN_KEY);
		setAuthStatus(AuthStatus.UNAUTHORIZED);
		setProfile(null);
	}, []);

	const recoveryPassword = React.useCallback(async (data: RecoveryPasswordInput) => {
		try {
			const res = await authService.recoveryPassword(data);
			setEmail(data.email);

			return res;
		} catch (err) {
			throw err;
		}
	}, []);

	const resetPassword = React.useCallback(async (data: ResetPasswordInput) => {
		try {
			const res = await authService.resetPassword(data);
			history.push(PageUrls.login);
			toast(MESSAGE_SUCCESS_RECOVERY_PASSWORD);

			return res;
		} catch (err) {
			throw err;
		}
	}, []);

	return {
		profile,
		authStatus,
		email,
		checkToken,
		login,
		register,
		logout,
		recoveryPassword,
		resetPassword,
	};
};
