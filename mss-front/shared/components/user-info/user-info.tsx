import React from 'react';
import { logout } from "../../auth-api";
import { store } from "react-notifications-component";
import styled from "styled-components";

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

const UserInfoBlock = styled.div`
  border-radius: 2px;
  padding: 4px 8px;
  background: #333;
  align-self: flex-end;
`;

const LogoutButton = styled.span`
  cursor: pointer;
  &:hover {
    color: #ffa6c9;
  }
`;

export const UserInfo = ({ username }: Props) => {
  return (
    <UserInfoBlock>
      Hello, {username}! <LogoutButton onClick={handleLogoutClick}>Log out</LogoutButton>
    </UserInfoBlock>
  );
};