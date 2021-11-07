import fetch from 'cross-fetch';
const setCookie = require('set-cookie-parser');

let _inputCookies: {
  [name: string]: string;
} = {};

let _outputCookies: Array<{
  name: string;
  value: string;
  /* options */
}> = [];

const mapSetCookieToInputCookies = (s: string) => {
  const cookiesArray = setCookie.parse(s);
  return cookiesArray.reduce((acc, item) => {
    return {
      ...acc,
      [item.name]: item.value,
    }
  }, {});
}

export const serverFetch = {
  fetch: async (input: RequestInfo, init?: RequestInit) => {
    const cookiesString = Object.entries(_inputCookies)
      .map(([key, value]) => `${key}=${value}`).join('; ');
    const response = await fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: cookiesString,
      }
    });
    if (response.headers.has('set-cookie')) {
      // устанавливаем куки для последующих запросов с сервера на API
      _inputCookies = mapSetCookieToInputCookies(response.headers.get('set-cookie'));
      // устанавливаем куки для установки заголовка set-cookie ответа сервера
      _outputCookies = setCookie.parse(response.headers.get('set-cookie'));
    }
    return response;
  },
  setCookies: (cookies) => {
    _inputCookies = cookies;
  },
  getCookies: () => {
    return _outputCookies;
  },
};
