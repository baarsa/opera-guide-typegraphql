import { tokenManager } from "./token-manager";

export const loginApi = ({ login, password }: { login: string; password: string }) => {
  return fetch('http://localhost:8080/auth/login', { // todo set link from env!
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
  return fetch('http://localhost:8080/auth/user', { // todo set link from env!
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
  return fetch('http://localhost:8080/auth/refresh', { // todo set link from env!
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then(res => {
    if (res.status !== 200) throw new Error();
    return res.json();
  });
};
