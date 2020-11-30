import { GetAllOperasDocument } from "../../gql-types/types";

export const operaNames = ['Die Walküre', 'Der Rosenkavalier'];

export const mocks = [{
  request: {
    query: GetAllOperasDocument,
  },
  result: {
    data: {
      operas: operaNames.map((name, i) => ({
        id: i,
        name,
        author: {
          name: 'author',
        }
      })),
    }
  }
}];
