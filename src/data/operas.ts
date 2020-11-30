import { VoiceType } from "../types/VoiceType";
import { Role } from "../types/Role";

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
        name: 'Aida',
        creationYear: 1871,
        authorId: '2',
        roles: [
            { name: 'Aida', voice: VoiceType.Soprano },
            { name: 'The King', voice: VoiceType.Bass },
            { name: 'Amneris', voice: VoiceType.Mezzo },
            { name: 'Radames', voice: VoiceType.Tenor },
        ],
    },
    {
        id: '3',
        name: 'Parsifal',
        creationYear: 1882,
        authorId: '1',
        roles: [
            { name: 'Parsifal', voice: VoiceType.Tenor },
            { name: 'Kundry', voice: VoiceType.Soprano },
            { name: 'Gurnemanz', voice: VoiceType.Bass },
            { name: 'Amfortas', voice: VoiceType.Baritone },
            { name: 'Klingsor', voice: VoiceType.Bass },
        ],
    },
    {
        id: '4',
        name: 'Die Zauberflöte',
        creationYear: 1791,
        authorId: '3',
        roles: [
            { name: 'Tamino', voice: VoiceType.Tenor },
            { name: 'Papageno', voice: VoiceType.Baritone },
            { name: 'Pamina', voice: VoiceType.Soprano },
            { name: 'Königin der Nacht', voice: VoiceType.Soprano },
            { name: 'Sarastro', voice: VoiceType.Bass },
          ]
    },
    {
        id: '5',
        name: 'Don Giovanni',
        creationYear: 1787,
        authorId: '3',
        roles: [
            { name: 'Don Giovanni', voice: VoiceType.Baritone },
            { name: 'Il Commendatore', voice: VoiceType.Bass },
            { name: 'Donna Anna', voice: VoiceType.Soprano },
            { name: 'Don Ottavio', voice: VoiceType.Tenor },
            { name: 'Leporello', voice: VoiceType.Bass },
          ],
    },
    {
        id: '6',
        name: 'Rigoletto',
        creationYear: 1851,
        authorId: '2',
        roles: [
            { name: 'Rigoletto', voice: VoiceType.Baritone },
            { name: 'Gilda', voice: VoiceType.Soprano },
            { name: 'Duke', voice: VoiceType.Tenor },
            { name: 'Sparafucile', voice: VoiceType.Bass },
            { name: 'Maddalena', voice: VoiceType.Contralto },
        ],
    },
];

export let operas = [...initOperas];
export const resetOperas = () => operas = [...initOperas];


