import * as React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css'; //todo fix
import {PerformanceSubscriber} from "./components/performance-subscriber/performance-subscriber";
import {Navigation} from "./components/navigation/navigation";
import styled from "styled-components";
import {StyledBlock} from "./components/styled-block/styled-block";
import { Login } from "./pages/login/login";
import { userInfoVar } from "./apollo-client-setup";
import { useReactiveVar } from '@apollo/react-hooks';
import loadable from '@loadable/component'
import Operas from './pages/operas/operas';

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

//const LOperas = loadable(() => import('./pages/operas/operas'));

export const App = () => {
    const location = useLocation();
    const userInfo = useReactiveVar(userInfoVar);
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
                <Navigation items={ actualNavigationItems }/>
                <Content>
                    <Switch>
                        <Route path='/operas' component={ Operas }/>
                        <Route path='/login' component={Login}/>
                        <Redirect to='/operas'/>
                    </Switch>
                </Content>
            </AppContainer>
        );
    }
;
