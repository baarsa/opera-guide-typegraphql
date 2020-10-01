import * as React from 'react';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

const GET_OPERA = gql`
    query GetOpera($id: Int!) {
        opera(id: $id) {
            id,
            name,
            creationYear,
        }
    }
`;

export const OperaCard = () => {
    const { loading, error, data } = useQuery(GET_OPERA, {
        variables: { id: 1 }
    });
    return (
        <div>
            { loading ? 'loading' : data.opera.name }
        </div>
    );
};
