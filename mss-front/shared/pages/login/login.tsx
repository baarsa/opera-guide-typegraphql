import React, { FormEventHandler, useState } from "react";
import styled from "styled-components";
import { tokenManager } from "../../token-manager";
import { appHistory } from "../../history";
import { loginApi, signupApi } from "../../auth-api";
import { store } from "react-notifications-component";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { setUserInfo } from "../../set-user-info";

// todo styles

const SwitchButton = styled.div<{ isActive: boolean }>`
  color: #b3b3b3;
  cursor: ${ props => props.isActive ? 'default' : 'pointer' };
  text-decoration: ${ props => props.isActive ? 'underline' : 'none' };
  &:hover {
    color: white;
  }
`;

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
    try {
      const res = await api({ login, password });
      tokenManager.setToken(res.token);
      setUserInfo(res.token);
      // todo механизм синхронизации UserInfo и токена
      appHistory.push('/');
    } catch (e) {
      store.addNotification({
        container: 'top-right',
        message: `Error: ${(e as Error).message}`,
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
    <SwitchButton onClick={() => setIsSignup(false)} isActive={ !isSignup }>Log in</SwitchButton>
    <SwitchButton onClick={() => setIsSignup(true)} isActive={ isSignup }>Sign up</SwitchButton>
    <Input name='login' placeholder='Enter login...' value={login} onChange={e => setLogin(e.target.value)} />
    <Input name='password' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
    <Button type='submit'>Submit</Button>
  </form>;
};

export default Login;
