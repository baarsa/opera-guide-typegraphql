import 'reflect-metadata';
import { ApolloServer } from "apollo-server";
import {BookResolver} from "./resolvers/BookResolver";
import { buildSchema } from 'type-graphql';
import {OperaResolver} from "./resolvers/OperaResolver";
import {ComposerResolver} from "./resolvers/ComposerResolver";

async function startServer() {
    const schema = await buildSchema({
        resolvers: [BookResolver, OperaResolver, ComposerResolver],
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
}

startServer();
