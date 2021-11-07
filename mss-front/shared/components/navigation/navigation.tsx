import React from 'react';
import styled from "styled-components";
import {StyledBlock} from "../styled-block/styled-block";
import { StyledLink } from '../styled-link/styled-link';

type NavigationProps = {
    items: {
        text: string;
        link: string;
        isActive: boolean;
    }[],
}

const Nav = styled(StyledBlock)`
    margin-top: 50px;
    padding-top: 0;
    padding-bottom: 0;    
    text-transform: uppercase;
`;

const Ul = styled.ul`  
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    margin: 10px 0;
`;

const Li = styled.li<{ isActive: boolean }>`
  padding: 5px;
  color: #b3b3b3;
  cursor: ${ props => props.isActive ? 'default' : 'pointer' };
  text-decoration: ${ props => props.isActive ? 'underline' : 'none' };
  &:hover {
    color: white;
  }
`;

const Navigation = ({ items }: NavigationProps) => (
    <Nav as='nav'>
        <Ul>
            { items.map(({ text, link, isActive }) => <Li key={ text } isActive={isActive}>
                { isActive ? text : <StyledLink to={link}>{ text }</StyledLink> }
            </Li>) }
        </Ul>
    </Nav>
);

export default Navigation;
