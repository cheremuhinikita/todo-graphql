import { IBaseModel } from '@core/interfaces';

export interface ITodoModel extends IBaseModel {
	title: string;
	description: string;
}
