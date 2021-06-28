import { ErrorCodes, ErrorCodesNumbers } from '@core/enums';
import { IErrorResponse, IHandlerError } from '@core/interfaces';
import { relocationOnError } from '@core/utils';

export class NotFoundHandler implements IHandlerError {
	handler(): void {
		relocationOnError(ErrorCodes.NotFound);
	}

	match(err: IErrorResponse): boolean {
		return err.statusCode === ErrorCodesNumbers.NotFound;
	}
}

export const notFoundHandler = new NotFoundHandler();
