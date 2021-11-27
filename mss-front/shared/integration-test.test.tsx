import React from "react";
import {render, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { MockedProvider } from "@apollo/client/testing";
import { mocks as operaListMocks, operaNames } from "./components/opera-list/__mocks";
import { mocks as subscriberMocks } from "./components/performance-subscriber/__mocks";
import { mocks as operaCardMocks, operaName } from "./components/opera-card/__mocks";
import { mocks as operaCreationMocks } from "./components/create-opera/__mocks";
import userEvent from "@testing-library/user-event";

const mocks = [
  ...operaListMocks,
  ...subscriberMocks,
  ...operaCardMocks,
  ...operaCreationMocks,
];

const renderApp = () => render(
  <MemoryRouter>
    <MockedProvider mocks={mocks}>
      <App shouldSetUserInfo={ false } />
    </MockedProvider>
  </MemoryRouter>
);

describe('App', () => {
  it('should render and navigate to opera page', async () => {
    const { getByRole, getByText } =  renderApp();
    const linkToOpera = await waitFor(() => getByRole('link', { name: operaNames[1] }));
    userEvent.click(linkToOpera);
    await waitFor(() => getByText(operaName));
  });
});
