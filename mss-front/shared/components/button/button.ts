import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  font: inherit;
  line-height: normal;
  cursor: pointer;
  background: #e8474c;
  color: white;
  font-weight: bold;
  padding: 10px;
  &:disabled {
    background: #5f0c0e
  }
`;
