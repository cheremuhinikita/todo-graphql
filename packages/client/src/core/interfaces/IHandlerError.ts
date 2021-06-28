import { IErrorResponse } from './IErrorResponse';

export interface IHandlerError {
	handler(response: IErrorResponse, ...args: unknown[]): void;

	match(response: IErrorResponse): boolean;
}
