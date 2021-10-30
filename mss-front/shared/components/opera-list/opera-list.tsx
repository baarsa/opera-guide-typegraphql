import React from "react";
import { useGetAllOperasQuery } from "../../gql-types/types";
import { StyledLink } from "../styled-link/styled-link";
import styled from "styled-components";

const OperaLink = styled(StyledLink)`
  &:hover {
    color: #ffa6c9;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const OperaList = () => {
  const { loading, data, error } = useGetAllOperasQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || data === undefined) {
    console.log(JSON.stringify(error));
    return <div>Error!</div>;
  }
  return (
    <Ul>
      {data.operas.map(({ id, name, author: { name: authorName } }) => (
        <li key={id}>
          <OperaLink to={`/operas/${id}`}>{name}</OperaLink> ({authorName})
        </li>
      ))}
    </Ul>
  );
};
