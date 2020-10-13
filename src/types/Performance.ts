import {Field, ObjectType} from "type-graphql";
import {Opera} from "./Opera";
import { Performer } from "./Performer";

@ObjectType()
export class Performance {
    @Field()
    id: string;

    @Field(type => Opera)
    opera: Opera;

    @Field(type => [Performer])
    performers: Performer[];

    @Field()
    location: string;

    @Field()
    date: string;
}
