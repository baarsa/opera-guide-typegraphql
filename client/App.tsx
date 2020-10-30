import * as React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { client } from './apollo-client-setup';
import {CreateOpera} from "./components/create-opera/create-opera";

export const App = () =>
    <ApolloProvider client={client}>
        <ReactNotification />
        <div>This is not the whole app... for now...</div>
        <CreateOpera
            onCreationSuccess={(name) => {
                console.log('added');
                store.addNotification({title: name, container: 'top-right', message: 'Opera added', type: "success"});
            }}
        />
    </ApolloProvider>
;
