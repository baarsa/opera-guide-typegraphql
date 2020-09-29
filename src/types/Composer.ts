import {Field, ID, Int, ObjectType} from "type-graphql";
import {Opera} from "./Opera";

@ObjectType()
export class Composer {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => Int)
    birthYear: number;

    @Field(type => [Opera])
    operas: Opera[];

}
