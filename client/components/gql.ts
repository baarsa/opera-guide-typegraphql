import gql from "graphql-tag";

export const GET_OPERA = gql`
    query GetOpera($id: ID!) {
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

export const GET_OPERA_ROLES = gql`
    query GetOperaRoles($id: ID!) {
        opera(id: $id) {
            id,
            roles {
                name,
                voice,
            }
        }
    }
`;

export const GET_ALL_COMPOSERS = gql`
    query GetAllComposers {
        composers {
            id
            name
        }
    }
`;

export const ADD_OPERA = gql`
    mutation AddOpera($operaData: OperaInput!) {
        addOpera(data: $operaData) {
            name
        }
    }
`
