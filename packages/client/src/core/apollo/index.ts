import { ApolloClient, from, InMemoryCache } from '@apollo/client';

import { authLink, errorLink, httpLink } from './links';

const link = from([errorLink, authLink.concat(httpLink)]);
const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
});

export default client;
