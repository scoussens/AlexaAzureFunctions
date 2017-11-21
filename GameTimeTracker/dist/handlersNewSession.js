"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
exports.NewSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = models_1.HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = models_1.HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.CancelIntent': function () {
        this.handler.state = models_1.HandlerStates.STOP;
        this.emitWithState('StopTimer', true);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = models_1.HandlerStates.HELP;
        this.emitWithState('HelpTheUser', true);
    },
    'AMAZON.StopIntent': function () {
        this.emit('StopTimerIntent');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start timer or stop timer.', 'Try saying help.');
    }
};
