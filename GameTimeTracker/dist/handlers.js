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
const timer_service_1 = require("./timer.service");
const timerService = new timer_service_1.TimerSessionService();
exports.handlers = {
    'LaunchRequest': function () {
        this.emit('StartTimerIntent');
    },
    'StartTimerIntent': function () {
        return __awaiter(this, void 0, void 0, function* () {
            let datetime = new Date(this.event.request.timestamp);
            let result = yield timerService.getSessions();
            console.log(JSON.stringify(result));
            this.emit(':tell', `Timer started at <say-as interpret-as="date">${result[0].timerStarted}</say-as>!`);
        });
    },
    'StopTimerIntent': function () {
        this.emit(':tell', 'Timer stopped! You have x time left.');
    },
    'CheckAvailableTimeIntent': function () {
        this.emit(':tell', 'You have x minutes available to play.');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('StopTimerIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'This skill is used to track daily game play time. You can check how much time is remaining each day, as well as start and stop the timer.');
    },
    'AMAZON.StopIntent': function () {
        this.emit('StopTimerIntent');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start or stop timer.', 'Try saying a check time.');
    }
};
