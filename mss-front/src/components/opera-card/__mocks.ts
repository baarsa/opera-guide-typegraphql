import { GetOperaDocument, GetOperaRolesDocument, VoiceType } from "../../gql-types/types";

export const operaName = 'Parsifal';
export const authorName = 'Richard Wagner';

export const characters = [
  { name: 'Parsifal', voice: VoiceType.Tenor },
  { name: 'Kundri', voice: VoiceType.Soprano },
  { name: 'Klingsor', voice: VoiceType.Bass },
];

export const mocks = [{
  request: {
    query: GetOperaDocument,
    variables: {
      id: '1',
    }
  },
  result: {
    data: {
      opera: {
        id: '1',
        name: operaName,
        creationYear: 1882,
        author: {
          name: authorName,
        },
        __typename: 'Opera',
      }
    }
  },
}, {
  request: {
    query: GetOperaDocument,
    variables: {
      id: '0',
    }
  },
  error: new Error(),
}, {
  request: {
    query: GetOperaRolesDocument,
    variables: {
      id: '1',
    }
  },
  result: {
    data: {
      opera: {
        id: '1',
        roles: characters,
        __typename: 'Opera',
      }
    }
  }
}
];
