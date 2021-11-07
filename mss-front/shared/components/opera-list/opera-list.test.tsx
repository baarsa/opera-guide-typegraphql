import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {render, waitFor} from "@testing-library/react";
import OperaList from "./opera-list";
import { MemoryRouter } from 'react-router-dom';
import { mocks, operaNames } from "./__mocks";

const renderOperaList = () => render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
            <OperaList />
        </MemoryRouter>
    </MockedProvider>
);

describe('opera-list', () => {
    it('should render "Loading..." while loading', () => {
        const { getByText } = renderOperaList();
        const loadingElement = getByText('Loading...');
        expect(loadingElement).toBeDefined();
    });
    it('should render operas names as links', async () => {
        const { getByRole } = renderOperaList();
        const operaNameLinks = await waitFor(() => operaNames.map(name => getByRole('link', { name })));
        operaNameLinks.forEach(link => expect(link).toBeDefined());
    });
});
