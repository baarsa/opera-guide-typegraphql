import { PubSub } from 'graphql-subscriptions';

export type PerformanceData = {
    operaId: string;
    performersIds: number[];
    location: string;
    date: string;
}

export const performancePublisher = new PubSub();

const publish = () => {
    performancePublisher.publish('PERFORMANCE', {
        operaId: '1',
        performersIds: [0, 1],
        location: 'London',
        date: '2020.11.07',
    });
    console.log('published');
};

export const startPublishing = () => {
    setInterval(publish, 5000);
};
