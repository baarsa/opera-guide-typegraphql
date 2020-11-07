import React from 'react';
import {MockedProvider} from '@apollo/client/testing';
import {GetOperaDocument, GetOperaRolesDocument, VoiceType} from "../../gql-types/types";
import {render, waitFor} from '@testing-library/react';
import {OperaCard} from "./opera-card";
import userEvent from "@testing-library/user-event";

const operaName = 'Parsifal';
const authorName = 'Richard Wagner';

const characters = [
    { name: 'Parsifal', voice: VoiceType.Tenor },
    { name: 'Kundri', voice: VoiceType.Soprano },
    { name: 'Klingsor', voice: VoiceType.Bass },
    ];

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
                },
                __typename: 'Opera',
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
                __typename: 'Opera',
            }
        }
    }
}
];

describe('opera-card', () => {
    it('should render opera name and author name', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'1'} />
            </MockedProvider>
        );
        const [operaNameElement, authorNameElement] = await waitFor(() => [
            getByText(new RegExp(operaName)),
            getByText(new RegExp(authorName)),
        ]);
        expect(operaNameElement).toBeDefined();
        expect(authorNameElement).toBeDefined();
    });
    it('should render text: "Error!" if request fails', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'0'} />
            </MockedProvider>
        );
        const errorElement = await waitFor(() => getByText(content => content.includes('Error!')));
        expect(errorElement).toBeDefined();
    });
    it('should render button with text "Show characters"', async () => {
        const { getByRole } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'1'} />
            </MockedProvider>
        );
        const button = await waitFor(() => getByRole('button', { name: /show characters/i }));
        expect(button).toBeDefined();
    });
    it('should render elements with characters names and voice types after click on "Show characters', async () => {
        const { getByRole, getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <OperaCard operaId={'1'} />
            </MockedProvider>
        );
        const button = await waitFor(() => getByRole('button', { name: /show characters/i }));
        userEvent.click(button);
        const elements = await waitFor(() => characters.map(char => getByText(new RegExp(`${char.name}.*${char.voice}`))));
        elements.forEach(element => expect(element).toBeDefined());
    });
});
