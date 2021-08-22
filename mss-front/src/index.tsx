import * as React from 'react';
import { render } from 'react-dom';
import { App } from "./App";
import {client} from "./apollo-client-setup";
import {ApolloProvider} from "@apollo/react-hooks";
import { Router } from "react-router-dom";
import { appHistory } from "./history";

render(
    <ApolloProvider client={client}>
        <Router history={appHistory}>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root'));
