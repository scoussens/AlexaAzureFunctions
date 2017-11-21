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
const models_1 = require("./models");
exports.handlers = {
    'LaunchRequest': function () {
        this.handler.state = models_1.HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = models_1.HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'StartTimerIntent': function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit(':tell', `Timer started!`);
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
        this.handler.state = models_1.HandlerStates.HELP;
        this.emitWithState('HelpTheUser', true);
    },
    'AMAZON.StopIntent': function () {
        this.emit('StopTimerIntent');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start timer or stop timer.', 'Try saying a check available time.');
    }
};
