import { tokenManager } from "./token-manager";
import { isServer } from "./is-server";
import { appHistory } from "./history";
import { serverFetch } from "../server/serverFetch";
import crossFetch from 'cross-fetch';
import { UserInfo } from "./apollo-client-setup";

const fetch = isServer() ? serverFetch.fetch : crossFetch;

const getAUTH_URI = () => isServer()
  ? process.env.SERVER_AUTH_URI || '/auth'
  : process.env.AUTH_URI || '/auth'


type Credentials = {
  login: string;
  password: string;
}

type AuthResponse = {
  token: string;
}

export const loginApi = async ({ login, password }: Credentials) => {
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
  return res.json() as Promise<AuthResponse>;
}

export const signupApi = ({ login, password }: Credentials) => {
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
    return res.json() as Promise<AuthResponse>;
  });
};

const fetchUserInfo = async (token: string) => {
  const response = await fetch(`${getAUTH_URI()}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    return 'Unauthorized';
  }
  if (response.status !== 200) {
    throw new Error();
  }
  return response.json() as Promise<UserInfo>;
}

export const getUserInfo = async () => {
  let token = tokenManager.getToken();
  if (token === null) {
    const tokenResponse = await getNewTokens();
    token = tokenResponse.token;
    tokenManager.setToken(token);
  }
  const response = await fetchUserInfo(token);
  if (response === 'Unauthorized') {
      const tokenResponse = await getNewTokens();
      const { token } = tokenResponse;
      tokenManager.setToken(token);
      return fetchUserInfo(token);
  }
  return response;
};

export const getNewTokens = async () => {
  console.log('fetching new tokens...', `${getAUTH_URI()}/refresh`);
  const fetchResult = await fetch(`${getAUTH_URI()}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  console.log(`got auth response: ${JSON.stringify(fetchResult)}`);
  if (fetchResult.status !== 200) throw new Error();
  return fetchResult.json() as Promise<AuthResponse>;
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
