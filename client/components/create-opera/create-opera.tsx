import React, {useState} from 'react';
import {Role, useAddOperaMutation, useGetAllComposersQuery, VoiceType} from "../../gql-types/types";

export type CreateOperaProps = {
    onCreationSuccess?: (name: string) => void;
}

const INIT_YEAR_VALUE = '1800';
const INIT_VOICE_TYPE = VoiceType.Soprano;

export const CreateOpera = ({ onCreationSuccess = () => {} }: CreateOperaProps) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState(INIT_YEAR_VALUE);
    const [authorId, setAuthorId] = useState('');
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [newRoleVoice, setNewRoleVoice] = useState<VoiceType>(INIT_VOICE_TYPE);

    const composers = useGetAllComposersQuery({
        onCompleted: (data) => {
            setAuthorId(data.composers[0].id);
        },
    });
    const [addOpera, { loading, error }] = useAddOperaMutation({
        onCompleted: (response) => {
            onCreationSuccess(response.addOpera.name);
            setName('');
            setYear(INIT_YEAR_VALUE);
            setRoles([]);
        },
        update: (cache, data) => {
            cache.modify({
                fields: {
                    operas(prevOperas) {
                        return [...prevOperas, data.data.addOpera];
                    }
                }
            })
        },
    });
    if (composers.loading) {
        //todo standard spinner
        return <div>'Loading...'</div>;
    }
    if (composers.error) {
        //todo standard spinner
        return <div>Error</div>;
    }
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addOpera({
                variables: {
                    operaData: {
                        name,
                        creationYear: Number(year),
                        authorId,
                        roles,
                    }
                }
            });
        }}>
            <label htmlFor='name'>Name</label>
            <input id='name' value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor='creationYear'>Year of creation</label>
            <input id='creationYear' type='number' value={year} onChange={e => setYear(e.target.value)} />
            <label htmlFor='author'>Author</label>
            <select id='author' value={authorId} onChange={e => setAuthorId(e.target.value)}>
                {
                    composers.data.composers.map(composer => <option value={composer.id} key={composer.id}>{ composer.name }</option>)
                }
            </select>
            {
                roles.map(role => <div key={ role.name }>
                    <div onClick={() => {
                        setRoles(roles => roles.filter(({ name }) => name !== role.name));
                    }}>[x]</div>
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
                    type='button'
                    onClick={() => {
                        setRoles(roles => [...roles, {name: newRoleName, voice: newRoleVoice}]);
                        setNewRoleName('');
                        setNewRoleVoice(INIT_VOICE_TYPE);
                    }}
                >
                    Add role
                </button>
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
};
