import { HttpLink } from '@apollo/client';

import { API_URL } from '@core/constants';

export const httpLink = new HttpLink({
	uri: `${API_URL}/graphql`,
});
