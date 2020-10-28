import React from 'react';
import {render, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {CreateOpera, CreateOperaProps} from "./create-opera";
import {MockedProvider} from "@apollo/client/testing";
import {GetAllComposersDocument, OperaInput} from "../../gql-types/types";
import {ADD_OPERA} from "../gql";

const createdOperaData: OperaInput = {
    name: 'Das Rheingold',
    creationYear: 1869,
    authorId: '1',
    roles: [],
};

const mocks = [{
    request: {
        query: GetAllComposersDocument,
    },
    result: {
        data: {
            composers: [{id: '1', name: 'Wagner'}, {id: '2', name: 'Verdi'}],
        },
    },
},
    {
    request: {
        query: ADD_OPERA,
        variables: {
            operaData: createdOperaData,
        }
    },
    result: {
        data: {
            addOpera: {
                name: createdOperaData.name,
            },
        },
    },
}];

const renderComponent = (props: CreateOperaProps = {}) => render(<MockedProvider mocks={mocks} addTypename={false}>
        <CreateOpera {...props} />
    </MockedProvider>
    );

describe('create-opera', () => {
    it('should render all form fields', async () => {
        const { getByLabelText } = renderComponent();
        const nameInput = await waitFor(() => getByLabelText('Name'));
        const yearInput = await waitFor(() => getByLabelText('Year of creation'));
        const authorInput = await waitFor(() => getByLabelText('Author'));
        expect(nameInput).toBeDefined();
        expect(yearInput).toBeDefined();
        expect(authorInput).toBeDefined();
    });
    it('should render "new role" inputs', async () => {
        const { getByLabelText } = renderComponent();
        const roleName = await waitFor(() => getByLabelText('Role name'));
        const roleVoice = await waitFor(() => getByLabelText('Role voice'));
        expect(roleName).toBeDefined();
        expect(roleVoice).toBeDefined();
    });
    it('should render "new role" add button', async () => {
        const { getByRole } = renderComponent();
        const addRoleButton = await waitFor(() => getByRole('button', { name: 'Add role' }));
        expect(addRoleButton).toBeDefined();
    });
    it('should render submit button', async () => {
        const { getByRole } = renderComponent();
        const submitButton = await waitFor(() =>  getByRole('button', { name: 'Submit' }));
        expect(submitButton).toBeDefined();
    });
    it('should call onCreationSuccess with name of created opera after success', async () => {
        const onCreationSuccess = jest.fn();
        const { getByRole, getByLabelText } = renderComponent({ onCreationSuccess });
        const nameInput = await waitFor(() => getByLabelText('Name'));
        const yearInput = await waitFor(() => getByLabelText('Year of creation'));
        const authorInput = await waitFor(() => getByLabelText('Author'));

        userEvent.type(nameInput, createdOperaData.name);
        userEvent.clear(yearInput);
        userEvent.type(yearInput, String(createdOperaData.creationYear));
        userEvent.selectOptions(authorInput, [createdOperaData.authorId]);
        const submitButton = await waitFor(() =>  getByRole('button', { name: 'Submit' }));
        userEvent.click(submitButton);

        await waitFor(() => expect(onCreationSuccess).toHaveBeenCalledWith(createdOperaData.name));
    });
});
