import React from 'react';
import {Link} from "react-router-dom";
import {useGetAllOperasQuery} from "../../gql-types/types";

export const OperaList = () => {
    const { loading, data, error } = useGetAllOperasQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error!</div>;
    }
    return (
        <div>
            {
                data.operas.map(({ id, name, author: { name: authorName } }) => (
                    <div key={ id }><Link to={`/operas/${id}`}>{ name }</Link> ({ authorName })</div>
                ))
            }
        </div>
    )
};
