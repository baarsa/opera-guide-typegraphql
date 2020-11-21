import * as React from "react";
import {
  useGetOperaQuery,
  useGetOperaRolesLazyQuery,
} from "../../gql-types/types";
import { useState } from "react";
import { Button } from "../button/button";
import styled from "styled-components";

type Props = {
  operaId: string;
};

const OperaHeader = styled.header`
  display: flex;
  color: #ffa6c9;
`;
const OperaHeaderLeft = styled.div`
  margin-right: auto;  
  text-transform:uppercase;
`;
const OperaYear = styled.span`
  color: #67c8ff;
`;
const ToggleRolesButton = styled(Button)`
  margin: 10px auto;
  width: 220px;
`;


export const OperaCard = ({ operaId }: Props) => {
  const { loading, error, data } = useGetOperaQuery({
    variables: { id: operaId },
  });
  const [
    getRoles,
    { loading: rolesLoading, data: rolesData },
  ] = useGetOperaRolesLazyQuery();
  const [rolesAreVisible, setAreRolesVisible] = useState(false);
  if (loading) {
    return <div>'Loading...'</div>;
  }
  if (error) {
    return <div>'Error!'</div>;
  }
  return (
    <article>
      <OperaHeader>
        <OperaHeaderLeft>
            {data.opera.name} <OperaYear>{data.opera.creationYear}</OperaYear>
        </OperaHeaderLeft>
        by&nbsp;
        <div>{data.opera.author.name}</div>
      </OperaHeader>
      <ToggleRolesButton
        onClick={() => {
          if (rolesData === undefined) {
            getRoles({ variables: { id: operaId } });
          }
          setAreRolesVisible(!rolesAreVisible);
        }}
      >
        { rolesAreVisible ? 'Hide' : 'Show' } characters
      </ToggleRolesButton>
      {rolesAreVisible ? (
        <section>
          {rolesData !== undefined
            ? rolesData.opera.roles.map(({ name, voice }) => (
                <div key={name}>
                  {name}: {voice}
                </div>
              ))
            : null}
        </section>
      ) : null}
    </article>
  );
};
