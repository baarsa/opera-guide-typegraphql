import React, {useState} from 'react';
import {Role, useAddOperaMutation, useGetAllComposersQuery, VoiceType} from "../../gql-types/types";

export type CreateOperaProps = {
    onCreationSuccess?: (name: string) => void;
}

export const CreateOpera = ({ onCreationSuccess = () => {} }: CreateOperaProps) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState(1800);
    const [authorId, setAuthorId] = useState('');
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleVoice, setNewRoleVoice] = useState<VoiceType>(VoiceType.Soprano);

    const composers = useGetAllComposersQuery();
    // add types
    // add success message and drop inputs
    const [addOpera, { loading, error }] = useAddOperaMutation({
        onCompleted: (response) => {
            onCreationSuccess(response.addOpera.name);
        },
    });
    if (composers.loading) {
        //todo standard spinner
        return <div>'Loading...'</div>;
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addOpera({
                variables: {
                    operaData: {
                        name,
                        creationYear: year,
                        authorId,
                        roles,
                    }
                }
            });
        }}>
            <label htmlFor='name'>Name</label>
            <input id='name' value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor='creationYear'>Year of creation</label>
            <input id='creationYear' type='number' value={year} onChange={e => setYear(Number(e.target.value))} />
            <label htmlFor='author'>Author</label>
            <select id='author' value={authorId} onChange={e => setAuthorId(e.target.value)}>
                {
                    composers.data.composers.map(composer => <option value={composer.id} key={composer.id}>{ composer.name }</option>)
                }
            </select>
            {
                roles.map(role => <div>
                    <div>[x]</div>
                    <div>Name: { role.name }</div>
                    <div>Voice: { role.voice }</div>
                </div>)
            }
            <div>
                <label htmlFor='roleName'>Role name</label>
                <input id='roleName' value={newRoleName} onChange={e => setNewRoleName(e.target.value)} />
                <label htmlFor='roleVoice'>Role voice</label>
                <select id='roleVoice' value={newRoleVoice} onChange={e => setNewRoleVoice(e.target.value as VoiceType)}>
                    <option value={ VoiceType.Soprano }>{ VoiceType.Soprano }</option>
                    <option value={ VoiceType.Mezzo }>{ VoiceType.Mezzo }</option>
                    <option value={ VoiceType.Contralto }>{ VoiceType.Contralto }</option>
                    <option value={ VoiceType.Tenor }>{ VoiceType.Tenor }</option>
                    <option value={ VoiceType.Baritone }>{ VoiceType.Baritone }</option>
                    <option value={ VoiceType.Bass }>{ VoiceType.Bass }</option>
                </select>
                <button
                    onClick={() => setRoles(roles => [...roles, { name: newRoleName, voice: newRoleVoice }])}
                >
                    Add role
                </button>
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
};
