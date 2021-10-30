import React, {FC} from 'react';
import {usePerformanceSubscriptionSubscription} from "../../gql-types/types";
import { store } from 'react-notifications-component';
// import 'animate.css'; todo fix

export const PerformanceSubscriber: FC = () => {
    usePerformanceSubscriptionSubscription({
        onSubscriptionData: (data) => {
            if (data.subscriptionData.data === undefined) {
                return;
            }
            const { opera, performers, date, location } = data.subscriptionData.data.upcomingPerformance;
            const message = `Prepare for an upcoming performance of ${ opera.name } in ${location} on ${date}!\n
             Cast includes ${performers.map(({ name }) => name).join(', ')}.`;
            store.addNotification({
                container: 'top-right',
                message, type: 'info',
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000
                },
            });
        },
    });
    return null;
};
