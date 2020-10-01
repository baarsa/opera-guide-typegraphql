import {FieldResolver, Query, Resolver, Root} from "type-graphql";
import {ComposerData, composers} from "../data/composers";
import { operas } from "../data/operas";
import {Composer} from "../types/Composer";

@Resolver(Composer)
export class ComposerResolver {
    @Query(returns => [Composer])
    composers() {
        return composers;
    }

    @FieldResolver()
    operas(@Root() composerData: ComposerData) {
        return operas.filter(({ authorId }) => authorId === composerData.id);
    }
}
