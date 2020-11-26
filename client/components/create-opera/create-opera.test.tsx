import React from 'react';
import {render, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {CreateOpera, CreateOperaProps} from "./create-opera";
import {MockedProvider} from "@apollo/client/testing";
import {GetAllComposersDocument, OperaInput, VoiceType} from "../../gql-types/types";
import {ADD_OPERA} from "../gql";

const createdOperaData: OperaInput = {
    name: 'Das Rheingold',
    creationYear: 1869,
    authorId: '1',
    roles: [{
        name: 'Alberich',
        voice: VoiceType.Bass,
    }],
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
    it('should add role name/voice description after click on add role button', async () => {
        const { getByRole, getByLabelText, getByText } = renderComponent();
        const roleName = await waitFor(() => getByLabelText('Role name'));
        const roleVoice = await waitFor(() => getByLabelText('Role voice'));
        const addRoleButton = await waitFor(() => getByRole('button', { name: 'Add role' }));
        userEvent.type(roleName, 'Loge');
        userEvent.selectOptions(roleVoice, VoiceType.Tenor);
        userEvent.click(addRoleButton);
        await waitFor(() => [
            getByText(/name.+loge/i),
            getByText(new RegExp(`voice.+${VoiceType.Tenor}`, 'i')),
        ]);
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

        const roleName = await waitFor(() => getByLabelText('Role name'));
        const roleVoice = await waitFor(() => getByLabelText('Role voice'));
        const addRoleButton = await waitFor(() => getByRole('button', { name: 'Add role' }));
        userEvent.type(roleName, createdOperaData.roles[0].name);
        userEvent.selectOptions(roleVoice, createdOperaData.roles[0].voice);
        userEvent.click(addRoleButton);

        const submitButton = await waitFor(() =>  getByRole('button', { name: 'Submit' }));
        userEvent.click(submitButton);

        await waitFor(() => expect(onCreationSuccess).toHaveBeenCalledWith(createdOperaData.name));
    });
    it('should reset inputs after successful creation', async () => {
        const { getByRole, getByLabelText, queryByText } = renderComponent();
        const nameInput = await waitFor(() => getByLabelText('Name'));
        const yearInput = await waitFor(() => getByLabelText('Year of creation'));
        const authorInput = await waitFor(() => getByLabelText('Author'));

        userEvent.type(nameInput, createdOperaData.name);
        const initialYearValue = Number((yearInput as HTMLInputElement).value);
        userEvent.clear(yearInput);
        userEvent.type(yearInput, String(createdOperaData.creationYear));
        userEvent.selectOptions(authorInput, [createdOperaData.authorId]);

        const roleName = await waitFor(() => getByLabelText('Role name'));
        const roleVoice = await waitFor(() => getByLabelText('Role voice'));
        const addRoleButton = await waitFor(() => getByRole('button', { name: 'Add role' }));
        userEvent.type(roleName, createdOperaData.roles[0].name);
        userEvent.selectOptions(roleVoice, createdOperaData.roles[0].voice);
        userEvent.click(addRoleButton);

        const submitButton = await waitFor(() =>  getByRole('button', { name: 'Submit' }));
        userEvent.click(submitButton);
        await waitFor(() => [
            expect(nameInput).toHaveValue(''),
            expect(yearInput).toHaveValue(initialYearValue),
            expect(queryByText(new RegExp(`name.+${createdOperaData.roles[0].name}`, 'i'))).not.toBeInTheDocument(),
            expect(queryByText(new RegExp(`voice.+${createdOperaData.roles[0].voice}`, 'i'))).not.toBeInTheDocument(),
        ]);
    })
});
