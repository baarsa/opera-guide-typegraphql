import React from 'react';
import {useGetAllOperasQuery} from "../../gql-types/types";

export const OperaList = () => {
    const { loading, data } = useGetAllOperasQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            {
                data.operas.map(({ id, name, author: { name: authorName } }) => (
                    <div key={ id }><a href='/'>{ name }</a> ({ authorName })</div>
                ))
            }
        </div>
    )
};
