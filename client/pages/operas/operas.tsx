import React from 'react';
import {Route, Switch, useRouteMatch } from 'react-router-dom';
import {OperaList} from "../../components/opera-list/opera-list";
import {OperaCard} from "../../components/opera-card/opera-card";
import {CreateOpera} from "../../components/create-opera/create-opera";

export const Operas = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}`} exact={true} component={OperaList} />
            <Route path={`${match.path}/create`} exact={true} component={CreateOpera} />
            <Route
                path={`${match.path}/:id`}
                render={({ match: { params: { id } } }) => {
                    return <OperaCard operaId={id}/>;
                }}
            />
        </Switch>
    );
};
