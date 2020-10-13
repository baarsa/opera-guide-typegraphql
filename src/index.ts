import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import {OperaResolver} from "./resolvers/OperaResolver";
import {ComposerResolver} from "./resolvers/ComposerResolver";
import {startPublishing} from "./performancePublisher";
import {PerformanceResolver} from "./resolvers/PerformanceResolver";

async function startServer() {
    const schema = await buildSchema({
        resolvers: [OperaResolver, ComposerResolver, PerformanceResolver],
    });
    const server = new ApolloServer({
        schema,
    });
    await server.listen(4000);
}

startServer();
startPublishing();
