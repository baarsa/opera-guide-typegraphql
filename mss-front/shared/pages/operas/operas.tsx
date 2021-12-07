import React from 'react';
import {Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import {store} from "react-notifications-component";
import { useQuery } from "@apollo/react-hooks";
import loadable from "@loadable/component";
import { USER_INFO } from "../../gql-types/user-info";
import { UserInfo } from "../../set-user-info";

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
    const userInfo = useQuery<UserInfo>(USER_INFO).data?.user ?? null;
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
