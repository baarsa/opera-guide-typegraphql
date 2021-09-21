if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import {OperaResolver} from "./resolvers/OperaResolver";
import {ComposerResolver} from "./resolvers/ComposerResolver";
import {startPublishing} from "./performancePublisher";
import {PerformanceResolver} from "./resolvers/PerformanceResolver";

const PORT = process.env.PORT || 4000;

// do we need express at all?
    async function startApolloServer() {
        const schema = await buildSchema({
            resolvers: [OperaResolver, ComposerResolver, PerformanceResolver],
        });
        const server = new ApolloServer({
            schema,
        });
        console.log(`listening on ports: ${PORT}`);
        await server.listen({ port: PORT, url: '/graphql' });
    }
    startApolloServer();

startPublishing();
