import React, { useMemo, useState } from "react";
import {
  Role,
  useAddOperaMutation,
  useGetAllComposersQuery,
  VoiceType,
} from "../../gql-types/types";
import styled from "styled-components";
import { RoleItem } from "./role-item";
import { Button } from "../button/button";
import { Label } from "../label/label";
import { Input } from "../input/input";

export type CreateOperaProps = {
  onCreationSuccess?: (name: string) => void;
};

const INIT_YEAR_VALUE = "1800";
const INIT_VOICE_TYPE = VoiceType.Soprano;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
  margin: 10px 0;
`;

const Select = styled.select`
  background: #222;
  font: inherit;
  color: inherit;
  line-height: normal;
  border: none;
  outline: none;
  width: 100%;
`;

const UpperPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Column = styled.div`
  width: 45%;
`;

const CreateOpera = ({
  onCreationSuccess = () => { /* noop */ },
}: CreateOperaProps) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(INIT_YEAR_VALUE);
  const [authorId, setAuthorId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleVoice, setNewRoleVoice] = useState<VoiceType>(INIT_VOICE_TYPE);

  const formValidationError = useMemo(() => {
    if (name.length === 0) {
      return "Enter the name of the opera";
    }
    if (roles.length === 0) {
      return "Add at least one role";
    }
    return null;
  }, [roles, name]);

  const composers = useGetAllComposersQuery({
    onCompleted: (data) => {
      setAuthorId(data.composers[0].id);
    },
  });
  const [addOpera, { loading, error }] = useAddOperaMutation({
    onCompleted: (response) => {
      onCreationSuccess(response.addOpera.name);
      setName("");
      setYear(INIT_YEAR_VALUE);
      setRoles([]);
    },
    update: (cache, { data }) => {
      if (data === null || data === undefined) {
        return;
      }
      cache.modify({
        fields: {
          operas(prevOperas: (typeof data.addOpera)[]) {
            return [...prevOperas, data.addOpera];
          },
        },
      });
    },
  });
  if (composers.loading) {
    //todo standard spinner
    return <div>'Loading...'</div>;
  }
  if (composers.error || composers.data === undefined) {
    //todo standard spinner
    return <div>Error</div>;
  }
  return (
    <Form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        void addOpera({
          variables: {
            operaData: {
              name,
              creationYear: Number(year),
              authorId,
              roles,
            },
          },
        });
      }}
    >
      <UpperPart>
        <Column>
          <Item>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Item>
          <Item>
            <Label htmlFor="creationYear">Year of creation</Label>
            <Input
              id="creationYear"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Item>
          <Item>
            <Label htmlFor="author">Author</Label>
            <Select
              id="author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              {composers.data.composers.map((composer) => (
                <option value={composer.id} key={composer.id}>
                  {composer.name}
                </option>
              ))}
            </Select>
          </Item>
          <h3>Add a role</h3>
          <Item>
            <Label htmlFor="roleName">Role name</Label>
            <Input
              id="roleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </Item>
          <Item>
            <Label htmlFor="roleVoice">Role voice</Label>
            <Select
              id="roleVoice"
              value={newRoleVoice}
              onChange={(e) => setNewRoleVoice(e.target.value as VoiceType)}
            >
              <option value={VoiceType.Soprano}>{VoiceType.Soprano}</option>
              <option value={VoiceType.Mezzo}>{VoiceType.Mezzo}</option>
              <option value={VoiceType.Contralto}>{VoiceType.Contralto}</option>
              <option value={VoiceType.Tenor}>{VoiceType.Tenor}</option>
              <option value={VoiceType.Baritone}>{VoiceType.Baritone}</option>
              <option value={VoiceType.Bass}>{VoiceType.Bass}</option>
            </Select>
          </Item>
          <Button
            type="button"
            onClick={() => {
              setRoles((roles) => [
                ...roles,
                { name: newRoleName, voice: newRoleVoice },
              ]);
              setNewRoleName("");
              setNewRoleVoice(INIT_VOICE_TYPE);
            }}
          >
            Add role
          </Button>
        </Column>
        <Column>
          {roles.map((role) => (
            <RoleItem
              key={role.name}
              onClick={() => {
                setRoles((roles) =>
                  roles.filter(({ name }) => name !== role.name)
                );
              }}
              name={role.name}
              voice={role.voice}
            />
          ))}
        </Column>
      </UpperPart>
      <Button
        disabled={formValidationError !== null}
        type="submit"
        title={formValidationError === null ? undefined : formValidationError}
      >
        Submit
      </Button>
    </Form>
  );
};

export default CreateOpera;
