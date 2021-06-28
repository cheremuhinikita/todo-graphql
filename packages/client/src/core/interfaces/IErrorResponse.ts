import { ErrorCodesNumbers } from '@core/enums';
import { ErrorResponseMessage, ErrorResponseError } from '@core/types';

export interface IErrorResponse {
	statusCode: ErrorCodesNumbers;
	message: ErrorResponseMessage;
	error: ErrorResponseError;
}
