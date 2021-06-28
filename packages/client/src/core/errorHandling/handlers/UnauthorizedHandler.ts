import { ErrorCodes, ErrorCodesNumbers } from '@core/enums';
import { IErrorResponse, IHandlerError } from '@core/interfaces';
import { relocationOnError } from '@core/utils';

export class UnauthorizedHandler implements IHandlerError {
	handler(): void {
		relocationOnError(ErrorCodes.Unauthorized);
	}

	match(err: IErrorResponse): boolean {
		return err.statusCode === ErrorCodesNumbers.Unauthorized;
	}
}

export const unauthorizedHandler = new UnauthorizedHandler();
