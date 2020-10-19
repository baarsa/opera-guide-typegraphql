import {Field, InputType, ObjectType} from "type-graphql";
import {VoiceType} from "./VoiceType";

@ObjectType()
export class Role {
    @Field()
    name: string;

    @Field(type => VoiceType)
    voice: VoiceType;
}

@InputType()
export class RoleInput {
    @Field()
    name: string;

    @Field(type => VoiceType)
    voice: VoiceType;
}
