import React, { FormEventHandler, useState } from "react";
import { tokenManager } from "../../token-manager";
import { appHistory } from "../../history";
import { getUserInfo, loginApi } from "../../auth-api";
import { userInfoVar } from "../../apollo-client-setup";

// todo add switch to sign up.
export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (login.length === 0 || password.length === 0) {
      alert('Incorrect values'); // todo make notification
      return;
    }
    // send
    loginApi({ login, password })
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
  };
  return <form onSubmit={ onSubmit }>
    <input name='login' placeholder='Enter login...' value={login} onChange={e => setLogin(e.target.value)} />
    <input name='password' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
    <button type='submit'>Submit</button>
  </form>;
};
