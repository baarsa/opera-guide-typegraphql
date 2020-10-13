import {registerEnumType} from "type-graphql";

export enum VoiceType {
    Bass,
    Baritone,
    Tenor,
    Contralto,
    Mezzo,
    Soprano,
}

registerEnumType(VoiceType, {
    name: 'VoiceType',
});
