import { createBrowserHistory, createMemoryHistory } from 'history';
import { isServer } from "./is-server";

export const appHistory = isServer()
  ? createMemoryHistory({
    initialEntries: ['/'],
  })
  : createBrowserHistory();
