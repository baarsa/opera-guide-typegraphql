import React from 'react';
import {Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import {OperaList} from "../../components/opera-list/opera-list";
import {OperaCard} from "../../components/opera-card/opera-card";
import {CreateOpera} from "../../components/create-opera/create-opera";
import {store} from "react-notifications-component";

const CreateOperaWrapped = () => {
    const history = useHistory();
    return (
        <CreateOpera
            onCreationSuccess={(name) => {
                store.addNotification({
                    title: name,
                    container: 'top-right',
                    message: 'Opera successfully created',
                    type: 'success',
                    dismiss: {
                        duration: 4000
                    },
                });
                history.push('/');
            }}
        />
    );
};

export const Operas = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}`} exact={true} component={OperaList} />
            <Route path={`${match.path}/create`} exact={true} component={CreateOperaWrapped} />
            <Route
                path={`${match.path}/:id`}
                render={({ match: { params: { id } } }) => {
                    return <OperaCard operaId={id}/>;
                }}
            />
        </Switch>
    );
};
