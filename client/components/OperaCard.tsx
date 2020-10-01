import * as React from 'react';
import {useGetOperaQuery} from "../gql-types/types";

export const OperaCard = () => {
    const { loading, error, data } = useGetOperaQuery({ variables: { id: 1 } });
    if (loading) return <div>loading</div>;
    if (error) return <div>{ error.message }</div>;
    const { opera: { name, creationYear, author: { name: author } } }  = data;
    return (
        <div>
            { loading ? 'loading' : `${name} - ${creationYear}, ${author}` }
        </div>
    );
};
