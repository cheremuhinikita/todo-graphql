import { ErrorCodes, ErrorCodesNumbers } from '@core/enums';
import { IErrorResponse } from '@core/interfaces';
import { IHandlerError } from '@core/interfaces/IHandlerError';
import { relocationOnError } from '@core/utils';

class InternalServerErrorHandler implements IHandlerError {
	handler(): void {
		relocationOnError(ErrorCodes.InternalServerError);
	}

	match(err: IErrorResponse): boolean {
		return err.statusCode === ErrorCodesNumbers.InternalServerError;
	}
}

export const internalServerErrorHandler = new InternalServerErrorHandler();
