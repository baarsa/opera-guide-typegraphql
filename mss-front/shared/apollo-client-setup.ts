import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
  makeVar,
  from,
  Observable
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { fromPromise,  } from '@apollo/client/link/utils';
import { appHistory } from "./history";
import { tokenManager } from "./token-manager";
import { getNewTokens } from './auth-api';
import { ServerError } from "@apollo/react-hooks";
import fetch from 'cross-fetch';
import { isServer } from "./is-server";
import { serverFetch } from "../server/serverFetch";


const graphqlHttpUri = isServer()
  ? process.env.SERVER_GRAPHQL_HTTP_URI || 'http://localhost/api/graphql'  //server
  : process.env.GRAPHQL_HTTP_URI || '/api/graphql'; //client
const graphqlWsUri = process.env.GRAPHQL_WS_URI || 'ws://localhost:8080/api/graphql';

const cache = new InMemoryCache();
//todo вернуть прежний вариант
const httpLink = createHttpLink({
    uri: graphqlHttpUri,
    fetch: isServer() ? serverFetch.fetch : fetch,
});

// const wsLink = new WebSocketLink({
//     uri: graphqlWsUri,
//     options: {
//         reconnect: true
//     }
// });
//
// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// );

const authLink = setContext((_, { headers }: { headers: Record<string, string> }) => {
    const token = tokenManager.getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const errorLink = onError(
  ({ networkError, operation, forward }) => {
      if (networkError !== undefined && (networkError as ServerError).statusCode === 401) {
        return fromPromise(
          getNewTokens()
            .then(({ token }) => {
              // Store the new tokens for your auth link
              tokenManager.setToken(token);
              return token;
            })
            .catch(() => {
              return false;
            })
        )
          .flatMap((tokenOrFalse) => {
            if (tokenOrFalse === false) {
              // todo реализовать редирект на сервере
              appHistory.push('/login');
              return new Observable((observer) => {
                observer.error('refresh error');
              });
            } else {
              return forward(operation);
            }
          });
      }
  }
);

type UserRole = 'admin' | 'viewer' | 'contributor';

export type UserInfo = {
  name: string;
  role: UserRole;
}

export const userInfoVar = makeVar<UserInfo | null>(null);
export const client = (() => {
  const _cache = cache;
  try {
    if (!isServer()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      _cache.restore(JSON.parse(window.__APOLLO_STATE__));
    }
  } catch (e) {
    console.log('Failed to restore apollo cache state');
  }
  return new ApolloClient({
    ssrMode: isServer(),
    cache: _cache,
    link: from([errorLink, authLink, httpLink]) // todo enable ws link
  });
})();

