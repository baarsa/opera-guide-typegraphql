import * as React from 'react';
import { render } from 'react-dom';
import { App } from "./App";
import { client, userInfoVar } from "./apollo-client-setup";
import {ApolloProvider} from "@apollo/react-hooks";
import { Router } from "react-router-dom";
import { appHistory } from "./history";
import { tokenManager } from "./token-manager";
import { getUserInfo } from "./auth-api";
/*
if (tokenManager.getToken() !== null) {
  getUserInfo().then(res => userInfoVar(res))
    .catch(e => {
      appHistory.push('/login');
    });
}

 */

render(
    <ApolloProvider client={client}>
        <Router history={appHistory}>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root'));
