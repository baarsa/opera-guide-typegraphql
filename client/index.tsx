import * as React from 'react';
import { render } from 'react-dom';
import { App } from "./App";
import {client} from "./apollo-client-setup";
import {ApolloProvider} from "@apollo/react-hooks";
import {BrowserRouter} from "react-router-dom";

render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
