import {Arg, FieldResolver, Int, Query, Resolver, Root} from "type-graphql";
import { Opera } from "../types/Opera";
import {OperaData, operas} from "../data/operas";
import {composers} from "../data/composers";

@Resolver(Opera)
export class OperaResolver {

    @Query(returns => [Opera])
    operas() {
        return operas;
    }

    @Query(returns => Opera)
    opera(
        @Arg('id', type => Int) id: number
    ) {
        return operas.find(opera => opera.id = id);
    }

    @FieldResolver()
    author(@Root() operaData: OperaData) {
        return composers.find(({ id }) => id === operaData.authorId);
    }
}
