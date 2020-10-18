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
