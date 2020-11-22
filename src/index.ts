import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import { createServer } from 'http';
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express';
import { execute, subscribe } from "graphql";
import {OperaResolver} from "./resolvers/OperaResolver";
import {ComposerResolver} from "./resolvers/ComposerResolver";
import {startPublishing} from "./performancePublisher";
import {PerformanceResolver} from "./resolvers/PerformanceResolver";

import * as express from 'express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
const path = require('path');
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
    async function startApolloServer() {
        const schema = await buildSchema({
            resolvers: [OperaResolver, ComposerResolver, PerformanceResolver],
        });
        const server = new ApolloServer({
            schema,
        });
        await server.listen({ port: PORT, url: '/graphql' });
    }
    startApolloServer();
}

if (process.env.NODE_ENV === 'production') {
    (async () => {
        const schema = await buildSchema({
            resolvers: [OperaResolver, ComposerResolver, PerformanceResolver],
        });
        const apolloServer = new ApolloServerExpress({
            schema,
        });
        const app = express();
        apolloServer.applyMiddleware({ app });
        app
          .use(express.static(path.join(path.resolve('./'), 'dist', 'client')))
          .get('*', (req, res) => res.sendFile(path.join(path.resolve('./'), 'dist', 'client', 'index.html')));

        const server = createServer(app);
          server.listen(PORT, () => {
              console.log(`Listening on ${PORT}`);
              new SubscriptionServer({
                  execute,
                  subscribe,
                  schema,
              }, {
                  server,
                  path: '/graphql',
              });
          });
    })();
}

startPublishing();
