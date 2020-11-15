import {VoiceType} from "../types/VoiceType";
import {Role} from "../types/Role";

export type OperaData = {
    id: string;
    name: string;
    creationYear: number;
    authorId: string;
    roles: Role[]
}

const initOperas: OperaData[] = [
    {
        id: '1',
        name: 'Tristan und Isolde',
        creationYear: 1850,
        authorId: '1',
        roles: [
            { name: 'Tristan', voice: VoiceType.Tenor },
            { name: 'Isolde', voice: VoiceType.Soprano },
            { name: 'Brangäne', voice: VoiceType.Soprano },
            { name: 'Kurwenal', voice: VoiceType.Baritone },
            { name: 'Marke', voice: VoiceType.Bass },
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

export let operas = [...initOperas];
export const resetOperas = () => operas = [...initOperas];


