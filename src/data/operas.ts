import {VoiceType} from "../types/VoiceType";
import {Role} from "../types/Role";

export type OperaData = {
    id: string;
    name: string;
    creationYear: number;
    authorId: string;
    roles: Role[]
}

export const operas: OperaData[] = [
    {
        id: '1',
        name: 'Tristan und Isolde',
        creationYear: 1850,
        authorId: '1',
        roles: [
            { name: 'Tristan', voice: VoiceType.Tenor },
            { name: 'Isolde', voice: VoiceType.Soprano },
        ]
    },
    {
        id: '2',
        name: 'Traviata',
        creationYear: 1852,
        authorId: '2',
        roles: [],
    },
    {
        id: '3',
        name: 'Parsifal',
        creationYear: 1882,
        authorId: '1',
        roles: [],
    }
];


