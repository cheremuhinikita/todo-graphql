import client from '@core/apollo';

import {
	LoginDocument,
	LoginInput,
	LoginMutation,
	LoginMutationVariables,
	ProfileDocument,
	ProfileQuery,
	ProfileQueryVariables,
	RecoveryPasswordDocument,
	RecoveryPasswordInput,
	RecoveryPasswordMutation,
	RecoveryPasswordMutationVariables,
	RegisterDocument,
	RegisterInput,
	RegisterMutation,
	RegisterMutationVariables,
	ResetPasswordDocument,
	ResetPasswordInput,
	ResetPasswordMutation,
	ResetPasswordMutationVariables,
} from '@gql';

class AuthService {
	public async profile(): Promise<ProfileQuery['profile']> {
		const { data } = await client.query<ProfileQuery, ProfileQueryVariables>({
			query: ProfileDocument,
		});
		const { profile } = data as ProfileQuery;

		return profile;
	}

	public async login(input: LoginInput): Promise<LoginMutation['login']> {
		const { data } = await client.mutate<LoginMutation, LoginMutationVariables>({
			mutation: LoginDocument,
			variables: {
				input,
			},
		});
		const { login } = data as LoginMutation;

		return login;
	}

	public async register(input: RegisterInput): Promise<RegisterMutation['register']> {
		const { data } = await client.mutate<RegisterMutation, RegisterMutationVariables>({
			mutation: RegisterDocument,
			variables: {
				input,
			},
		});
		const { register } = data as RegisterMutation;

		return register;
	}

	public async recoveryPassword(input: RecoveryPasswordInput): Promise<boolean> {
		const { data } = await client.mutate<
			RecoveryPasswordMutation,
			RecoveryPasswordMutationVariables
		>({
			mutation: RecoveryPasswordDocument,
			variables: {
				input,
			},
		});
		const { recoveryPassword } = data as RecoveryPasswordMutation;

		return recoveryPassword;
	}

	public async resetPassword(input: ResetPasswordInput): Promise<boolean> {
		const { data } = await client.mutate<ResetPasswordMutation, ResetPasswordMutationVariables>(
			{
				mutation: ResetPasswordDocument,
				variables: {
					input,
				},
			},
		);
		const { resetPassword } = data as ResetPasswordMutation;

		return resetPassword;
	}
}

export const authService = new AuthService();
