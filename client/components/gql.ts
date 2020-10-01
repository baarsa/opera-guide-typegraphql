import gql from "graphql-tag";

export const GET_OPERA = gql`
    query GetOpera($id: Int!) {
        opera(id: $id) {
            id,
            name,
            creationYear,
            author {
                name,
            }
        }
    }
`;
