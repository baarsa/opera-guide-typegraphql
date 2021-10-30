import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../shared/apollo-client-setup";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import express from "express";
import { tokenManager } from "../shared/token-manager";
import { App } from "../shared/App";
import { ServerStyleSheet } from 'styled-components'

const nodeStats = path.resolve(
  __dirname,
  './loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../web/loadable-stats.json',
)

export const response = async function (req: express.Request, res: express.Response) {
  tokenManager.setTokens({
    token: req.cookies.token,
    refreshToken: req.cookies.refreshToken,
  });
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
  //const { default: App } = nodeExtractor.requireEntrypoint()
  const sheet = new ServerStyleSheet();
  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const jsx = webExtractor.collectChunks(<ApolloProvider client={client}>
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  </ApolloProvider>)
  const html = await renderToStringWithData(sheet.collectStyles(jsx));
  const styleTags = sheet.getStyleTags()
  sheet.seal()
  console.log('after render');
  res.set('content-type', 'text/html')
  res.cookie('token', tokenManager.getToken());
  res.cookie('refreshToken', tokenManager.getRefreshToken());
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>        
        ${webExtractor.getStyleTags()}
        ${ styleTags }
        </head>
        <body>
          <div id="main">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `);
}


