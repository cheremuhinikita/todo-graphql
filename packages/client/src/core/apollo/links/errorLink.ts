import { ErrorResponse, onError } from '@apollo/client/link/error';

import { rootHandlerError } from '@core/errorHandling';
import { notifyServerError } from '@core/notify';

import { mapGqlErrors } from '../utils';

export const errorLink = onError((gqlResponse: ErrorResponse) => {
	mapGqlErrors(gqlResponse, (response) => {
		notifyServerError(response.message);
		rootHandlerError(response);
	});
});
