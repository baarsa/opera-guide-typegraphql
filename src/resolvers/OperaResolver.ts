import {FieldResolver, Query, Resolver, Root} from "type-graphql";
import { Opera } from "../types/Opera";
import {operas} from "../data/operas";
import {composers} from "../data/composers";

@Resolver(Opera)
export class OperaResolver {

    @Query(returns => [Opera])
    operas() {
        return operas;
    }

    @FieldResolver()
    author(@Root() operaData) {
        return composers.find(({ id }) => id === operaData.authorId);
    }
}
