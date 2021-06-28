import { toast } from 'react-toastify';

import { MESSAGE_ERROR_DEFAULT, SERVER_ERRORS_MESSAGES } from './constants';
import { ErrorResponseMessage } from './types';

export const notifyServerError = (message: ErrorResponseMessage): void => {
	const translateMessage = SERVER_ERRORS_MESSAGES[message] || MESSAGE_ERROR_DEFAULT;
	toast.error(translateMessage);
};
