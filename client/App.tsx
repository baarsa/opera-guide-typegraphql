import * as React from 'react';
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { client } from './apollo-client-setup';
import {PerformanceSubscriber} from "./components/performance-subscriber/performance-subscriber";
import {Operas} from "./pages/operas/operas";

export const App = () =>
    <ApolloProvider client={client}>
        <ReactNotification />
        <PerformanceSubscriber />
        <BrowserRouter>
            <Switch>
                <Route path='/operas' component={Operas} />
                <Redirect to='/operas' />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>
;
