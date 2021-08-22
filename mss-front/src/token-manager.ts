
export const tokenManager = {
  setTokens: ({ token, refreshToken }: { token: string; refreshToken: string }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  },
  getToken: () => localStorage.getItem('token'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
};
