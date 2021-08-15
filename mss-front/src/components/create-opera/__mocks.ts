import { GetAllComposersDocument, OperaInput, VoiceType } from "../../gql-types/types";
import { ADD_OPERA } from "../gql";

export const createdOperaData: OperaInput = {
  name: 'Das Rheingold',
  creationYear: 1869,
  authorId: '1',
  roles: [{
    name: 'Alberich',
    voice: VoiceType.Bass,
  }],
};

export const mocks = [{
  request: {
    query: GetAllComposersDocument,
  },
  result: {
    data: {
      composers: [{id: '1', name: 'Wagner'}, {id: '2', name: 'Verdi'}],
    },
  },
},
  {
    request: {
      query: ADD_OPERA,
      variables: {
        operaData: createdOperaData,
      }
    },
    result: {
      data: {
        addOpera: {
          name: createdOperaData.name,
        },
      },
    },
  }];
