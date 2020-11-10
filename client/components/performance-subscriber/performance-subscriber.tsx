import React, {FC} from 'react';
import {usePerformanceSubscriptionSubscription} from "../../gql-types/types";
import { store } from 'react-notifications-component'

export const PerformanceSubscriber: FC = () => {
    usePerformanceSubscriptionSubscription({
        onSubscriptionData: (data) => {
            const { opera, performers, date, location } = data.subscriptionData.data.upcomingPerformance;
            const message = `Prepare for an upcoming performance of ${ opera.name } in ${location} on ${date}!\n
             Cast includes ${performers.map(({ name }) => name).join(', ')}.`;
            store.addNotification({
                title: name,
                container: 'top-right',
                message, type: 'info',
                dismiss: {
                    duration: 2000
                },
            });
        },
    });
    return null;
};
