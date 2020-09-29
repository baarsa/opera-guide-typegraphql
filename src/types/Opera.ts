import {Field, ID, Int, ObjectType} from "type-graphql";
import {Composer} from "./Composer";

@ObjectType()
export class Opera {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => Int)
    creationYear: number;

    @Field(type => Composer)
    author: Composer;

}
