import { MESSAGE_ERROR_VALIDATION_ERROR } from '@todo-graphql/common';

import { IErrorResponse, IHandlerError, IValidationError } from '@core/interfaces';
import { noopFn } from '@core/utils';

interface IValidationErrorResponse<T> extends IErrorResponse {
	errors: IValidationError<T>[];
}

export class ValidationFailedHandler implements IHandlerError {
	handler<T>(response: IValidationErrorResponse<T>, callback = noopFn): void {
		response.errors.forEach((error) => callback(error));
	}

	match(response: IErrorResponse): boolean {
		return response.message === MESSAGE_ERROR_VALIDATION_ERROR;
	}
}

export const validationFailedHandler = new ValidationFailedHandler();
