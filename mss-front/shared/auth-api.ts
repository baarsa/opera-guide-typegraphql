import { tokenManager } from "./token-manager";
import { isServer } from "./is-server";
import { appHistory } from "./history";
import { serverFetch } from "../server/serverFetch";
import crossFetch from 'cross-fetch';
import { setUserInfo } from "./set-user-info";

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
    throw Error(res.status === 401 ? 'Invalid credentials' :'Network error');
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
      throw Error('Network error');
    }
    return res.json() as Promise<AuthResponse>;
  });
};

export const getNewTokens = async () => {
  const fetchResult = await fetch(`${getAUTH_URI()}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (fetchResult.status === 401) {
    return 'Unauthorized';
  }
  if (fetchResult.status !== 200) {
    throw new Error('Network error');
  }
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
    throw Error('Network error');
  }
  tokenManager.dropToken();
  setUserInfo(null);
  appHistory.push('/login');
}
