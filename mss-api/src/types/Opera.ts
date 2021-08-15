import {Field, ID, InputType, Int, ObjectType} from "type-graphql";
import {Composer} from "./Composer";
import {Role, RoleInput} from "./Role";

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

    @Field(type => [Role])
    roles: [Role];
}

@InputType()
export class OperaInput {
    @Field()
    name: string;
    @Field(type => Int)
    creationYear: number;
    @Field()
    authorId: string;
    @Field(type => [RoleInput])
    roles: [Role];
}
