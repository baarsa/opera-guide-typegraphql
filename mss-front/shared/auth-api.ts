import { tokenManager } from "./token-manager";
import { isServer } from "./is-server";

const getAUTH_URI = () => isServer()
  ? process.env.SERVER_AUTH_URI || '/auth'
  : process.env.AUTH_URI || '/auth'

export const loginApi = ({ login, password }: { login: string; password: string }) => {
  return fetch(`${getAUTH_URI()}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  }).then(res => {
    if (res.status !== 200) {
      alert('Incorrect values'); //todo make notifications (handle errors in client code)
      // todo rewrite in async (fix regeneratorRuntime is not defined)
    }
    return res.json();
  });
};

export const loginApi2 = async ({ login, password }: { login: string; password: string }) => {
  const res = await fetch(`${getAUTH_URI()}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
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
  }).then(res => {
    if (res.status !== 200) {
      alert('Incorrect values'); //todo make notifications (handle errors in client code)
      // todo rewrite in async (fix regeneratorRuntime is not defined)
    }
    return res.json();
  });
};

export const getUserInfo = () => {
  const token = tokenManager.getToken();
  if (token === null) {
    throw new Error();
  }
  return fetch(`${getAUTH_URI()}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => {
    if (res.status !== 200) throw new Error();
    return res.json();
  });
};

export const getNewTokens = () => {
  const refreshToken = tokenManager.getRefreshToken();
  console.log('fetching new tokens...', `${getAUTH_URI()}/refresh`);
  return fetch(`${getAUTH_URI()}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then(res => {
    console.log(`got auth response: ${JSON.stringify(res)}`);
    if (res.status !== 200) throw new Error();
    return res.json();
  }).catch(e => {
    console.log(`got auth error: ${e.message}`);
  })
};
