import { tokenManager } from "./token-manager";
import { isServer } from "./is-server";
import { appHistory } from "./history";
import { serverFetch } from "../server/serverFetch";
import crossFetch from 'cross-fetch';
import { UserInfo, userInfoVar } from "./apollo-client-setup";

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
    throw new Error('Network error');
  }
  return response.json() as Promise<UserInfo>;
}

export const getUserInfo = async () => {
  let token = tokenManager.getToken();
  if (token === null) {
    const tokenResponse = await getNewTokens();
    if (tokenResponse === 'Unauthorized') {
      return tokenResponse;
    }
    token = tokenResponse.token;
    tokenManager.setToken(token);
  }
  const response = await fetchUserInfo(token);
  if (response === 'Unauthorized') {
      const tokenResponse = await getNewTokens();
      if (tokenResponse === 'Unauthorized') {
        return tokenResponse;
      }
      tokenManager.setToken(tokenResponse.token);
      return fetchUserInfo(tokenResponse.token);
  }
  return response;
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
  userInfoVar(null);
  tokenManager.dropToken();
  appHistory.push('/login');
}
