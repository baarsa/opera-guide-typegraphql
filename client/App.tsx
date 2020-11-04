import * as React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {PerformanceSubscriber} from "./components/performance-subscriber/performance-subscriber";
import {Operas} from "./pages/operas/operas";
import {Navigation} from "./components/navigation/navigation";

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
    },
];

export const App = () => {
    const location = useLocation();
    const actualNavigationItems = navigationItems.map(item => ({
        ...item,
        isActive: location.pathname === item.link,
    }));
        return (
            <>
            <ReactNotification/>
            <PerformanceSubscriber/>
                <Navigation items={ actualNavigationItems }/>
                <Switch>
                    <Route path='/operas' component={Operas}/>
                    <Redirect to='/operas'/>
                </Switch>
            </>
        );
    }
;
