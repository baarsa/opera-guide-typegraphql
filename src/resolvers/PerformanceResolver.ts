import {FieldResolver, Resolver, Root, Subscription} from "type-graphql";
import {Performance} from "../types/Performance";
import {operas} from "../data/operas";
import { performers } from "../data/performers";
import {PerformanceData, performancePublisher} from "../performancePublisher";

@Resolver(Performance)
export class PerformanceResolver {
    @Subscription(returns => Performance, {
        subscribe: () => {
            return performancePublisher.asyncIterator('PERFORMANCE');
        },
    })
    upcomingPerformance(@Root() performancePayload: PerformanceData) {
        return performancePayload;
    }

    @FieldResolver()
    opera(@Root() perfData: PerformanceData) {
        return operas.find(opera => opera.id = perfData.operaId);
    }

    @FieldResolver()
    performers(@Root() perfData: PerformanceData) {
        return perfData.performersIds.map(id => performers.find(performer => performer.id === id));
    }
}
