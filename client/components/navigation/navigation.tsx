import React from 'react';
import {Link} from "react-router-dom";

type NavigationProps = {
    items: {
        text: string;
        link: string;
        isActive: boolean;
    }[],
}

export const Navigation = ({ items }: NavigationProps) => (
    <nav>
        <ul>
            { items.map(({ text, link, isActive }) => <li key={ text }>
                { isActive ? text : <Link to={link}>{ text }</Link> }
            </li>) }
        </ul>
    </nav>
);
