import { tokenManager } from "./token-manager";
import { isServer } from "./is-server";
import { appHistory } from "./history";
import { serverFetch } from "../server/serverFetch";
import crossFetch from 'cross-fetch';

const fetch = isServer() ? serverFetch.fetch : crossFetch;

const getAUTH_URI = () => isServer()
  ? process.env.SERVER_AUTH_URI || '/auth'
  : process.env.AUTH_URI || '/auth'

export const loginApi = async ({ login, password }: { login: string; password: string }) => {
  const res = await fetch(`${getAUTH_URI()}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
    credentials: 'include',
  });
  if (res.status !== 200) {
    throw Error();
  }
  return res.json();
}

export const signupApi = ({ login, password }: { login: string; password: string }) => {
  return fetch(`${getAUTH_URI()}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
    credentials: 'include',
  }).then(res => {
    if (res.status !== 200) {
      alert('Incorrect values'); //todo make notifications (handle errors in client code)
    }
    return res.json();
  });
};

export const getUserInfo = async () => {
  const token = tokenManager.getToken();
  if (token === null) {
    const tokenResponse = await getNewTokens();
    const { token } = await tokenResponse.json();
    tokenManager.setToken(token);
  }
  const response = await fetch(`${getAUTH_URI()}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
      const tokenResponse = await getNewTokens();
      const { token } = await tokenResponse.json();
      tokenManager.setToken(token);
      return getUserInfo();
  }
  if (response.status !== 200) {
    throw new Error();
  }
  return response.json();
};

export const getNewTokens = () => {
  console.log('fetching new tokens...', `${getAUTH_URI()}/refresh`);
  return fetch(`${getAUTH_URI()}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => {
    console.log(`got auth response: ${JSON.stringify(res)}`);
    if (res.status !== 200) throw new Error();
    return res.json();
  }).catch(e => {
    console.log(`got auth error: ${e.message}`);
  })
};

export const logout = async () => {
  const result = await fetch(`${getAUTH_URI()}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (result.status !== 200) {
    throw Error();
  }
  tokenManager.dropToken();
  appHistory.push('/login');
}
