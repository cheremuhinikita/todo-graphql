import { ErrorResponse } from '@apollo/client/link/error';
import { IErrorResponse } from '@core/interfaces';

import { IExtensions } from '../interfaces';

export const mapGqlErrors = (
	{ graphQLErrors }: ErrorResponse,
	callback: (response: IErrorResponse) => void,
): void => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ extensions }) => {
			const {
				exception: { response },
			} = extensions as IExtensions;

			callback(response);
		});
};
