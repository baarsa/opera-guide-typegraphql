import * as React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from './apollo-client-setup';
import {OperaCard} from "./components/OperaCard";

export const App = () =>
    <ApolloProvider client={client}>
        <div>This is not the whole app... for now...</div>
        <OperaCard />
    </ApolloProvider>
;
