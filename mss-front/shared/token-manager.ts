import Cookies from 'js-cookie'
import { isServer } from "./is-server";

export const tokenManager = isServer()
// server token manager
  ? (() => {
    let _token = null;
    let _refreshToken = null;
    return ({
      setTokens: ({ token, refreshToken }: { token: string; refreshToken: string }) => {
        _token = token;
        _refreshToken = refreshToken;
      },
      getToken() {
        return _token;
      },
      getRefreshToken() {
        return _refreshToken;
      }
    });
  })()
  // client token manager
  : {
  setTokens: ({ token, refreshToken }: { token: string; refreshToken: string }) => {
    Cookies.set('token', token);
    Cookies.set('refreshToken', refreshToken);
  },
  getToken() {
    return Cookies.get('token');
  },
  getRefreshToken() {
    return Cookies.get('refreshToken');
  }
};
