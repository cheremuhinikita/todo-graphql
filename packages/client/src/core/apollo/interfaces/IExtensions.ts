import { IErrorResponse } from '@core/interfaces';

export interface IExtensions {
	code: string;
	exception: {
		message: string;
		response: IErrorResponse;
		stacktrace: string[];
		status: number;
	};
}
