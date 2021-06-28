export enum PageUrls {
	/* Guest routes */
	login = '/auth/login',
	register = '/auth/register',
	recoveryPassword = '/auth/recovery-password',

	/* Public routes */
	home = '/',
	users = '/users',
	error = '/error',

	/* Guarded routes */
	todo = '/todo',
}
