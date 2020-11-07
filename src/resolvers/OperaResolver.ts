import {Arg, FieldResolver, ID, Int, Mutation, Query, Resolver, Root} from "type-graphql";
import {Opera, OperaInput} from "../types/Opera";
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
        @Arg('id', type => ID) id: string
    ) {
        return operas.find(opera => opera.id === id);
    }

    @Mutation(returns => Opera)
    addOpera(@Arg('data') newOperaData: OperaInput) {
        const newId = `${operas.length + 1}`;
        operas.push({
            ...newOperaData,
            id: newId,
        });
        return operas[operas.length - 1];
    }

    @FieldResolver()
    author(@Root() operaData: OperaData) {
        return composers.find(({ id }) => id === operaData.authorId);
    }
}
