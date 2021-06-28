import { ErrorCodes, ErrorCodesNumbers } from '@core/enums';
import { IErrorResponse } from '@core/interfaces';
import { IHandlerError } from '@core/interfaces/IHandlerError';
import { relocationOnError } from '@core/utils';

class ForbiddenHandler implements IHandlerError {
	handler(): void {
		relocationOnError(ErrorCodes.Forbidden);
	}

	match(err: IErrorResponse): boolean {
		return err.statusCode === ErrorCodesNumbers.Forbidden;
	}
}

export const forbiddenHandler = new ForbiddenHandler();
