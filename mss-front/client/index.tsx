import "core-js/stable";
import "regenerator-runtime/runtime";
import * as React from 'react';
import { hydrate } from "react-dom";
import { App } from "../shared/App";
import { client } from "../shared/apollo-client-setup";
import {ApolloProvider} from "@apollo/react-hooks";
import { Router } from "react-router-dom";
import { appHistory } from "../shared/history";
import { loadableReady } from '@loadable/component'

loadableReady(() => {
  const root = document.getElementById('main');
  hydrate(<ApolloProvider client={client}>
    <Router history={appHistory}>
      <App />
    </Router>
  </ApolloProvider>, root)
});

