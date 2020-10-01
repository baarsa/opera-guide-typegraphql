import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
    uri: 'http://localhost:4000/',
});

export const client = new ApolloClient({
    cache,
    link
});
