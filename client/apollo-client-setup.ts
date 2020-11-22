import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const graphqlHttpUri = process.env.GRAPHQL_HTTP_URI || 'http://localhost:4000/graphql';
const graphqlWsUri = process.env.GRAPHQL_WS_URI || 'ws://localhost:4000/graphql';

const cache = new InMemoryCache();
const httpLink = createHttpLink({
    uri: graphqlHttpUri,
});

const wsLink = new WebSocketLink({
    uri: graphqlWsUri,
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
