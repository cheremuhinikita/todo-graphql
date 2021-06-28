import { ITodoModel } from '@modules/todo';
import { IUserModel } from './IUserModel';

export interface IFullUserModel extends IUserModel {
	todo?: Pick<ITodoModel, 'id' | 'title'>[];
}
