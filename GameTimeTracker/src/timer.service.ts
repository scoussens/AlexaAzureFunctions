import { config } from './config';
import { ScapholdService } from './scaphold.service';

const AUTH_TOKEN = config.SCAPHOLD_TOKEN;
const BASE_URL = config.SCAPHOLD_URL;

export interface TimerSession {
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    availableTime: number,
    user: User,
    timerStarted: Date,
    timerStopped: Date
}

export interface User {
    id: string
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
    async getSessions() {
        let query = `
        query GetTimerSessions {
            viewer {
              allTimerSessions {
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

        return client.post<AllTimerSessions>(query)
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