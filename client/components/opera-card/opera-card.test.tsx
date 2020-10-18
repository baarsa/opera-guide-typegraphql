import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {GetOperaDocument, GetOperaRolesDocument} from "../../gql-types/types";
import { render, waitFor } from '@testing-library/react';
import {OperaCard} from "./opera-card";

const operaName = 'Parsifal';
const authorName = 'Richard Wagner';

const characters = ['Parsifal', 'Amfortas', 'Kundri', 'Klingsor'];

const mocks = [{
    request: {
        query: GetOperaDocument,
        variables: {
            id: '1',
        }
    },
    result: {
        data: {
            opera: {
                id: '1',
                name: operaName,
                creationYear: 1882,
                author: {
                    name: authorName,
                }
            }
        }
    },
}, {
    request: {
        query: GetOperaDocument,
        variables: {
            id: '0',
        }
    },
    error: new Error(),
}, {
    request: {
        query: GetOperaRolesDocument,
        variables: {
            id: '1',
        }
    },
    result: {
        data: {
            opera: {
                id: '1',
                roles: characters,
            }
        }
    }
}
];

describe('opera-card', () => {
    it('renders opera name and author name', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'1'} />
            </MockedProvider>
        );
        const [operaNameElement, authorNameElement] = await Promise.all([
            waitFor(() => getByText(content => content.includes(operaName))),
            waitFor(() => getByText(content => content.includes(authorName))),
        ]);
        expect(operaNameElement).toBeDefined();
        expect(authorNameElement).toBeDefined();
    });
    it('renders text: "Error!" if request fails', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'0'} />
            </MockedProvider>
        );
        const errorElement = await waitFor(() => getByText(content => content.includes('Error!')));
        expect(errorElement).toBeDefined();
    });
    it('renders element with text "Show characters"', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'1'} />
            </MockedProvider>
        );
        const element = await waitFor(() => getByText(content => content.includes('Show characters')));
        expect(element).toBeDefined();
    });
});
