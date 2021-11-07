import React from 'react';
import Navigation from "./navigation";
import {render} from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

const items = [
    {
        text: 'Home',
        link: '/home',
        isActive: false,
    },
    {
        text: 'Page',
        link: '/page',
        isActive: false,
    },
    {
        text: 'Page2',
        link: '/page2',
        isActive: true,
    },
];

const renderNavigation = () => render(<MemoryRouter><Navigation items={items}/></MemoryRouter>);

describe('navigation', () => {
    it('should render all supplied items', () => {
        const { getByText } = renderNavigation();
        const elements = items.map(({ text }) => getByText(text));
        elements.forEach((element) => expect(element).toBeDefined());
    });
    it('should render inactive item as link', () => {
        const { getByRole } = renderNavigation();
        const inactiveItem = items[1];
        const element = getByRole('link', { name: inactiveItem.text });
        expect(element).toBeDefined();
        expect(element.getAttribute('href')).toEqual(inactiveItem.link);
    });
    it('should render active item as not-link', () => {
        const { getByText, queryByRole } = renderNavigation();
        const activeItem = items[2];
        const noElement = queryByRole('link', { name: activeItem.text });
        expect(noElement).toBeNull();
        const element = getByText(activeItem.text);
        expect(element).toBeDefined();
    });
});
