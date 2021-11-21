import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../shared/apollo-client-setup";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import express from "express";
import { App } from "../shared/App";
import { ServerStyleSheet } from 'styled-components'
import { serverFetch } from "./serverFetch";

const nodeStats = path.resolve(
  __dirname,
  './loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../web/loadable-stats.json',
)

export const response = async function (req: express.Request, res: express.Response) {
  const context = { url: req.url };
  serverFetch.clearCookies(); // очищение куки, оставшихся с прошлого запроса
  serverFetch.setCookies(req.cookies);
  const sheet = new ServerStyleSheet();
  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const jsx = webExtractor.collectChunks(<ApolloProvider client={client}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </ApolloProvider>)
  const html = await renderToStringWithData(sheet.collectStyles(jsx));

  const jsonInitialState = JSON.stringify(client.extract())
    .replace(/</g, '\\u003c')
    .replace(/\\"/g, '\\\\"');

  const styleTags = sheet.getStyleTags()
  sheet.seal();
  res.set('content-type', 'text/html')
  serverFetch.getCookies().forEach(function(cookieItem) {
    const { name, value, ...options} = cookieItem;
    res.cookie(cookieItem.name, cookieItem.value, options);
  });
  if (context.url !== req.url) {
    res.redirect(302, context.url);
    return;
  }
  res.send(`
      <!DOCTYPE html>
      <html style="height: 100%">
        <head>        
        ${webExtractor.getStyleTags()}
        ${ styleTags }
        </head>
        <body style="height: 100%">
          <div id="main" style="height: 100%">${html}</div>
          <script>window.__APOLLO_STATE__='${jsonInitialState}';</script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `);
}


