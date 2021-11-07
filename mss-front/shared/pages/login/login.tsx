import React, { FormEventHandler, useState } from "react";
import { tokenManager } from "../../token-manager";
import { appHistory } from "../../history";
import { getUserInfo, loginApi, signupApi } from "../../auth-api";
import { userInfoVar } from "../../apollo-client-setup";
import { store } from "react-notifications-component";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";

// todo styles

const Login = () => {
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
    const api = isSignup ? signupApi : loginApi;
    // send
    try {
      const res = await api({ login, password });
      tokenManager.setToken(res.token);
      const userInfo = await getUserInfo();
      userInfoVar(userInfo);
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
  };
  return <form onSubmit={ onSubmit }>
    <div onClick={() => setIsSignup(false)} style={{ display: isSignup ? 'none' : 'block' }}>Log in</div>
    <div onClick={() => setIsSignup(true)} style={{ display: isSignup ? 'block' : 'none' }}>Sign up</div>
    <Input name='login' placeholder='Enter login...' value={login} onChange={e => setLogin(e.target.value)} />
    <Input name='password' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
    <Button type='submit'>Submit</Button>
  </form>;
};

export default Login;
