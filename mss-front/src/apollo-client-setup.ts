import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { fromPromise, from } from 'apollo-link';
import { appHistory } from "./history";
import { tokenManager } from "./token-manager";

const graphqlHttpUri = process.env.GRAPHQL_HTTP_URI || 'http://localhost:4001/graphql';
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

const authLink = setContext((_, { headers }) => {
    const token = tokenManager.getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const getNewTokens = () => {
  const refreshToken = tokenManager.getRefreshToken();
  return fetch('http://localhost:4001/auth/refresh', { // todo set link from env!
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then(res => {
    if (res.status !== 200) throw new Error();
    return res.json();
  });
};

const errorLink = onError(
  ({ networkError, operation, forward }) => {
      if (networkError !== undefined && networkError.statusCode === 401) {
        return fromPromise(
          getNewTokens()
            .then(({ token, refreshToken }) => {
              // Store the new tokens for your auth link
              tokenManager.setTokens({ token, refreshToken });
              return token;
            })
            .catch(error => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
              appHistory.push('/login');
              return;
            })
        ).filter(value => {
          console.log(`filtering: ${value}`);
          return value !== undefined;
        })
          .flatMap(() => {
            // retry the request, returning the new observable
            return forward(operation) // todo implement redirect on retry failure
          });
      }
  }
);

export const client = new ApolloClient({
    cache,
    link: from([errorLink, authLink, splitLink])
});
