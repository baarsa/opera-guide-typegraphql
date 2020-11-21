import React from 'react';
import {VoiceType} from "../../gql-types/types";
import styled from "styled-components";

type RoleItemProps = {
    name: string;
    voice: VoiceType;
    onClick: () => void;
}

const RoleItemRoot = styled.div`
  position:relative;
  padding: 10px;
  margin-bottom: 10px;
  background: #222;
`;

const DeleteButton = styled.button`
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  right: 0;
  border: none;
  outline: none;
  background: #0074Da;
  cursor:pointer;
`;

export const RoleItem = ({ name, voice, onClick }: RoleItemProps) => (
    <RoleItemRoot>
        <DeleteButton onClick={onClick} title="Delete" />
        <div>Name: { name }</div>
        <div>Voice: { voice }</div>
    </RoleItemRoot>
);
