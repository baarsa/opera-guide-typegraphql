import { PubSub } from 'graphql-subscriptions';
import {operas} from "./data/operas";
import {performers} from "./data/performers";

export type PerformanceData = {
    operaId: string;
    performersIds: number[];
    location: string;
    date: string;
}

const randomInRange = (x: number) => Math.floor(Math.random() * x);
const generatePerformers = (count: number) => {
    const result = [];
    const rest = [...performers];
    for (let i = 0; i < count; i++) {
        result.push(rest.splice(randomInRange(rest.length), 1)[0].id);
    }
    return result;
};
const locations = ['London', 'Mew York', 'Vienna', 'Moscow', 'Berlin', 'Paris'];
const generateDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generatePerformance = () => ({
    operaId: String(1 + randomInRange(operas.length)),
    performersIds: generatePerformers(1 + randomInRange(3)),
    location: locations[randomInRange(locations.length)],
    date: generateDate(new Date(), (new Date('2021-12-31'))).toDateString(),
});

export const performancePublisher = new PubSub();

const publish = () => {
    performancePublisher.publish('PERFORMANCE', generatePerformance());
};

export const startPublishing = () => {
    setInterval(publish, 5000);
};
