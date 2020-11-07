import * as React from 'react';
import {useGetOperaQuery, useGetOperaRolesLazyQuery} from "../../gql-types/types";
import {useState} from "react";

type Props = {
    operaId: string;
}

export const OperaCard = ({ operaId }: Props) => {
    const { loading, error, data } = useGetOperaQuery({ variables: { id: operaId } });
    const [getRoles, { loading: rolesLoading, data: rolesData }] = useGetOperaRolesLazyQuery();
    const [rolesAreVisible, setAreRolesVisible] = useState(false);
    if (loading) {
        return <div>'Loading...'</div>;
    }
    if (error) {
        return <div>'Error!'</div>;
    }
    return (
        <div>
            <div>{ data.opera.name }, {data.opera.creationYear}</div>
            by
            <div>{ data.opera.author.name }</div>
            <button onClick={() => {
                if (rolesData === undefined) {
                    getRoles({variables: {id: operaId}});
                }
                setAreRolesVisible(!rolesAreVisible);
            }}>Show characters</button>
            { rolesAreVisible
                ? <div>
                    {
                        rolesData !== undefined
                            ? rolesData.opera.roles.map(({ name, voice }) => <div key={ name }>{ name }: { voice }</div>)
                            : null
                    }
                </div>
                : null }
        </div>
    )
};
