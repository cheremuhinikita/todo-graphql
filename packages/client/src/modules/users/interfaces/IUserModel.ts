import { Role } from '@core/enums';
import { IBaseModel } from '@core/interfaces';

export interface IUserModel extends IBaseModel {
	username: string;
	email: string;
	role: Role;
}
