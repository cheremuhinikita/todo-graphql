import { SERVER_ERRORS_MESSAGES } from '@core/constants';
import { ErrorCodes } from '@core/enums';

export type ErrorResponseMessage = keyof typeof SERVER_ERRORS_MESSAGES;
export type ErrorResponseError = keyof typeof ErrorCodes;
export type ExcludedErrorCodes = Exclude<ErrorCodes, ErrorCodes.BadRequest>;
