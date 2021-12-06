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
import { createHash } from "crypto";
import { tokenManager } from "../shared/token-manager";

const webStats = path.resolve(
  __dirname,
  '../web/loadable-stats.json',
)

const clearState = async () => {
  serverFetch.clearCookies();
  tokenManager.dropToken();
  await client.clearStore();
};

export const response = async function (req: express.Request, res: express.Response) {
  const context = { url: req.url };
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
  await clearState();
  if (context.url !== req.url) {
    res.redirect(302, context.url);
    return;
  }
  const inlineScript = `window.__APOLLO_STATE__='${jsonInitialState}';`;
  const inlineScriptHash = createHash('sha256').update(inlineScript).digest('base64');
  res.set("Content-Security-Policy", `object-src 'none'; script-src 'self' 'sha256-${inlineScriptHash}'`);
  res.send(`
      <!DOCTYPE html>
      <html style="height: 100%">
        <head>        
        ${webExtractor.getStyleTags()}
        ${ styleTags }
        </head>
        <body style="height: 100%">
          <div id="main" style="height: 100%">${html}</div>
          <script>${inlineScript}</script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
    `);
}


