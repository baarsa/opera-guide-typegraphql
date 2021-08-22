import React, { FormEventHandler, useState } from "react";
import { tokenManager } from "../../token-manager";
import { appHistory } from "../../history";

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
    fetch('http://localhost:4001/auth/login', { // todo set link from env!
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    }).then(res => {
      if (res.status !== 200) {
          alert('Incorrect values'); //todo make notifications
        // todo rewrite in async (fix regeneratorRuntime is not defined)
      }
      return res.json();
    })
      .then(res => {
        tokenManager.setTokens({ token: res.token, refreshToken: res.refreshToken });
        appHistory.push('/');
      })
      .catch(e => {
        alert('Network error');
      });
  };
  return <form onSubmit={ onSubmit }>
    <input name='login' placeholder='Enter login...' value={login} onChange={e => setLogin(e.target.value)} />
    <input name='password' placeholder='Enter password...' value={password} onChange={e => setPassword(e.target.value)} />
    <button type='submit'>Submit</button>
  </form>;
};
