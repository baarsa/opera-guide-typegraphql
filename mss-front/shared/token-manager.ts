export const tokenManager = (() => {
    let _token = null;
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
