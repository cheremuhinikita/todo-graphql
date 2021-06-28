import { IUser } from '@modules/users/interfaces/user.interface';

export interface ILoginType {
	token: string;
	profile: Omit<IUser, 'password' | 'todo'>;
}
