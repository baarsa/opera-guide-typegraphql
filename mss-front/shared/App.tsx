import * as React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import ReactNotification, { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import {PerformanceSubscriber} from "./components/performance-subscriber/performance-subscriber";
import styled from "styled-components";
import {StyledBlock} from "./components/styled-block/styled-block";
import { useQuery } from "@apollo/react-hooks";
import loadable from '@loadable/component'
import { UserInfo as UserInfoBlock } from "./components/user-info/user-info";
import { USER_INFO } from "./gql-types/user-info";
import { UserInfo } from "./set-user-info";

const navigationItems = [
    {
        text: 'Opera List',
        link: '/operas',
        isActive: false,
    },
    {
        text: 'Add Opera',
        link: '/operas/create',
        isActive: false,
        needRole: 'contributor',
    },
];

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;  
  font-family: Raleway,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 18px;  
  color: white;
  background: #659dbd;
`;

const Content = styled(StyledBlock)`
  margin-top: 20px;  
  font-size: 24px;
`;

const Navigation = loadable(() => import('./components/navigation/navigation'));
const Operas = loadable(() => import('./pages/operas/operas'));
const Login = loadable(() => import('./pages/login/login'));

export const App = () => {
    const location = useLocation();
    const userInfo = useQuery<UserInfo, null>(USER_INFO).data?.user ?? null;
    const actualNavigationItems = navigationItems
      .filter(item => item.needRole === undefined || (userInfo !== null && item.needRole === userInfo.role))
      .map(item => ({
        ...item,
        isActive: location.pathname === item.link,
    }));
        return (
            <AppContainer>
            <ReactNotification/>
                {/* <PerformanceSubscriber/> */}
                { userInfo !== null && <UserInfoBlock username={userInfo.name} /> }
                <Navigation items={ actualNavigationItems }/>
                <Content>
                    <Switch>
                        <Route path='/operas' component={ Operas }/>
                        <Route path='/login' component={ Login }/>
                        <Redirect to='/operas'/>
                    </Switch>
                </Content>
            </AppContainer>
        );
    }
;
