import React, { FormEventHandler, useState } from "react";
import { tokenManager } from "../../token-manager";
import { appHistory } from "../../history";
import { getUserInfo, loginApi, loginApi2, signupApi } from "../../auth-api";
import { userInfoVar } from "../../apollo-client-setup";
import { store } from "react-notifications-component";

// todo styles

export const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (login.length === 0 || password.length === 0) {
      store.addNotification({
        container: 'top-right',
        message: 'Incorrect values',
        type: 'danger',
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000
        },
      });
      return;
    }
    const api = isSignup ? signupApi : loginApi2;
    // send
    try {
      const res = await api({ login, password });
      tokenManager.setTokens({ token: res.token, refreshToken: res.refreshToken });
      const userInfo = await getUserInfo();
      userInfoVar(res);
      appHistory.push('/');
    } catch (e) {
      //todo network error or 401 ??
      store.addNotification({
        container: 'top-right',
        message: 'Network error',
        type: 'danger',
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000
        },
      });
    }
    /*
    api({ login, password })
      .then(res => {
      tokenManager.setTokens({ token: res.token, refreshToken: res.refreshToken });
      return getUserInfo();
    })
      .then((res) => {
        userInfoVar(res);
        appHistory.push('/');
      })
      .catch(e => {
        alert('network error');
      });

     */
  };
  return <form onSubmit={ onSubmit }>
    <div onClick={() => setIsSignup(false)}>Log in</div>
    <div onClick={() => setIsSignup(true)}>Sign up</div>
    <input name='login' placeholder='Enter login...' value={login} onChange={e => setLogin(e.target.value)} />
    <input name='password' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
    <button type='submit'>Submit</button>
  </form>;
};
