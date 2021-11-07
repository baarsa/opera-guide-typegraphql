import React from 'react';
import { logout } from "../../auth-api";
import { store } from "react-notifications-component";

type Props = {
  username: string;
}

const handleLogoutClick = async () => {
  try {
    await logout();
  } catch (e) {
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
}

export const UserInfo = ({ username }: Props) => {
  return (
    <div>
      Hello, {username}! <span onClick={handleLogoutClick}>Log out</span>
    </div>
  );
}