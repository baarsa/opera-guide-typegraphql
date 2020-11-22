import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import {OperaResolver} from "./resolvers/OperaResolver";
import {ComposerResolver} from "./resolvers/ComposerResolver";
import {startPublishing} from "./performancePublisher";
import {PerformanceResolver} from "./resolvers/PerformanceResolver";

import * as express from 'express';
const path = require('path');
const PORT = process.env.PORT || 5000;

async function startApolloServer() {
    const schema = await buildSchema({
        resolvers: [OperaResolver, ComposerResolver, PerformanceResolver],
    });
    const server = new ApolloServer({
        schema,
    });
    await server.listen(4000);
}

startApolloServer();
startPublishing();

if (process.env.NODE_ENV === 'production') {
    express()
        .use(express.static(path.join(path.resolve('./'), 'dist', 'client')))
        .get('*', (req, res) => res.sendFile(path.join(path.resolve('./'), 'dist', 'client', 'index.html')))
        .listen(PORT, () => console.log(`Listening on ${PORT}`));
}
