import React from 'react';
import {Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import {store} from "react-notifications-component";
import { useReactiveVar } from '@apollo/react-hooks';
import { userInfoVar } from "../../apollo-client-setup";
import loadable from "@loadable/component";

const OperaList = loadable(() => import('../../components/opera-list/opera-list'));
const CreateOpera = loadable(() => import('../../components/create-opera/create-opera'));
const OperaCard = loadable(() => import('../../components/opera-card/opera-card'));

const CreateOperaWrapped = () => {
  // todo check redirect
    const history = useHistory();
    return (
        <CreateOpera
            onCreationSuccess={(name) => {
                store.addNotification({
                    title: name,
                    container: 'top-right',
                    message: 'Opera successfully created',
                    type: 'success',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 4000
                    },
                });
                history.push('/');
            }}
        />
    );
};

const Operas = () => {
    const match = useRouteMatch();
    const userInfo = useReactiveVar(userInfoVar);
    return (
        <Switch>
            <Route path={`${match.path}`} exact={true} component={OperaList} />
          { userInfo !== null && userInfo.role === 'contributor' && <Route path={`${match.path}/create`} exact={true} component={CreateOperaWrapped} /> }
            <Route
                path={`${match.path}/:id`}
                render={({ match: { params: { id } } }) => {
                    return <OperaCard operaId={id}/>;
                }}
            />
        </Switch>
    );
};

export default Operas;
