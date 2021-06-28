import { IErrorResponse, IHandlerError } from '@core/interfaces';

import { internalServerErrorHandler, notFoundHandler, unauthorizedHandler } from './handlers';

export const handlers: IHandlerError[] = [
	internalServerErrorHandler,
	unauthorizedHandler,
	notFoundHandler,
	unauthorizedHandler,
];

export const matchesErrorHandler = (
	handler: IHandlerError,
	response: IErrorResponse,
	...other: unknown[]
): void => {
	if (handler.match(response)) handler.handler(response, ...other);
};

export const rootHandlerError = (response: IErrorResponse): void => {
	handlers.forEach((handler) => {
		matchesErrorHandler(handler, response);
	});
};
