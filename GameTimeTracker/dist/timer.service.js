"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const scaphold_service_1 = require("./scaphold.service");
const AUTH_TOKEN = config_1.config.SCAPHOLD_TOKEN;
const BASE_URL = config_1.config.SCAPHOLD_URL;
const client = new scaphold_service_1.ScapholdService(BASE_URL, AUTH_TOKEN);
class TimerSessionService {
    getSessions() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return client.post(query)
                .then(res => {
                let sessions = res.viewer.allTimerSessions.edges || null;
                let results = [];
                if (sessions && Array.isArray(sessions)) {
                    sessions.forEach(node => {
                        results.push(node.node);
                    });
                }
                return results;
            });
        });
    }
}
exports.TimerSessionService = TimerSessionService;
