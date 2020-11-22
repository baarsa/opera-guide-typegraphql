import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const graphqlUri = process.env.GRAPHQL_URI || 'localhost:4000/graphql';

const cache = new InMemoryCache();
const httpLink = createHttpLink({
    uri: `http://${graphqlUri}`,
});

const wsLink = new WebSocketLink({
    uri: `ws://${graphqlUri}`,
    options: {
        reconnect: true
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    cache,
    link: splitLink,
});
