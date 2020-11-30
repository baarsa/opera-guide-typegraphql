import { PerformanceSubscriptionDocument } from "../../gql-types/types";
import { operaNames } from "../opera-list/__mocks";

export const mocks = [{
  request: {
    query: PerformanceSubscriptionDocument,
  },
  result: {
    data: {
      upcomingPerformance: {
        opera: {
          name: 'Wozzeck',
          author: {
            name: 'Alban Berg',
          }
        },
        performers: [
          { name: 'Fischer-Dieskau' }
        ],
        location: 'London',
        date: 'April 1',
      }
    }
  }
}];
