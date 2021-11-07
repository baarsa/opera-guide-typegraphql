export const tokenManager = (() => {
    let _token: string | null = null;
    return ({
      setToken: (token: string) => {
        _token = token;
      },
      getToken() {
        return _token;
      },
      dropToken() {
        _token = null;
      }
    });
  })();
