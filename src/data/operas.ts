import {VoiceType} from "../types/VoiceType";

export type OperaData = {
    id: number;
    name: string;
    creationYear: number;
    authorId: number;
}

export const operas = [
    {
        id: '1',
        name: 'Tristan und Isolde',
        creationYear: 1850,
        authorId: 1,
        roles: [
            { name: 'Tristan', voice: VoiceType.Tenor },
            { name: 'Isolde', voice: VoiceType.Soprano },
        ]
    },
    {
        id: '2',
        name: 'Traviata',
        creationYear: 1852,
        authorId: 2,
        roles: [],
    },
    {
        id: '3',
        name: 'Parsifal',
        creationYear: 1882,
        authorId: 1,
        roles: [],
    }
];


