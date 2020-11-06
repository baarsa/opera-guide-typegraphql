import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

type NavigationProps = {
    items: {
        text: string;
        link: string;
        isActive: boolean;
    }[],
}

const Nav = styled.nav`
    margin: 20px auto;
    border: 1px solid brown;
    border-radius: 4px;
`;

const Ul = styled.ul`  
    display: flex;
    list-style-type: none;
`;

const Li = styled.li<{ isActive: boolean }>`
  background: ${ props => props.isActive ? 'red' : 'none' };
`;

export const Navigation = ({ items }: NavigationProps) => (
    <Nav>
        <Ul>
            { items.map(({ text, link, isActive }) => <Li key={ text } isActive={isActive}>
                { isActive ? text : <Link to={link}>{ text }</Link> }
            </Li>) }
        </Ul>
    </Nav>
);
