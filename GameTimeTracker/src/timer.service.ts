import { config } from './config';
import { ScapholdService, ScapholdViewFilters, OrderByObject, ScapholdUser } from './scaphold.service';

const AUTH_TOKEN = config.SCAPHOLD_TOKEN;
const BASE_URL = config.SCAPHOLD_URL;

export interface TimerSession {
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    availableTime: number,
    user: ScapholdUser,
    timerStarted: Date,
    timerStopped: Date
}

export interface AllTimerSessions {
    viewer: {
        allTimerSessions: {
            pageInfo: {
                hasNextPage: boolean,
                hasPreviousPage: boolean
            },
            edges: any[]
        }
    }
}

const client = new ScapholdService(BASE_URL, AUTH_TOKEN);

export class TimerSessionService {
    async getSessions(where?: any, orderBy?: OrderByObject[]) {
        let query = `
        query ($where: TimerSessionWhereArgs, $orderBy: [TimerSessionOrderByArgs]) {
            viewer {
              allTimerSessions (where: $where, orderBy: $orderBy) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                  node {
                    id
                    modifiedAt
                    timerStarted
                    timerStopped
                    availableTime
                  }
                }
              }
            }
          }
        `;

        let variables: ScapholdViewFilters = {};

        if(where) { variables.where = where; }
        if(orderBy) { variables.orderBy = orderBy; }

        return client.post<AllTimerSessions>(query, variables)
            .then(res => {
                let sessions = res.viewer.allTimerSessions.edges || null;
                let results: TimerSession[] = [];

                if(sessions && Array.isArray(sessions)) {
                    sessions.forEach(node => {
                        results.push(node.node as TimerSession);
                    })
                }

                return results;
            });
    }
}