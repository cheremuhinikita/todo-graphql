import { setContext } from '@apollo/client/link/context';
import { TOKEN_KEY } from '@core/constants';

export const authLink = setContext((_, { headers }) => {
	const token = window.localStorage.getItem(TOKEN_KEY);
	if (!token) {
		return { headers };
	}

	return {
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	};
});
