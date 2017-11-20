import axios from 'axios';
import { config } from './config';

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

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`
    }
});

export class TimerSessionService {
    async getSessions () {
        return axios.post('', `
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
        `)
    }
}