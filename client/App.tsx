import * as React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { client } from './apollo-client-setup';
import {CreateOpera} from "./components/create-opera/create-opera";
import {PerformanceSubscriber} from "./components/performance-subscriber/performance-subscriber";

export const App = () =>
    <ApolloProvider client={client}>
        <ReactNotification />
        <PerformanceSubscriber />
        <CreateOpera
            onCreationSuccess={(name) => {
                store.addNotification({title: name, container: 'top-right', message: 'Opera added', type: "success"});
            }}
        />
    </ApolloProvider>
;
