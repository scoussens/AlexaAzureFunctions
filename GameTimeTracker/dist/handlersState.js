"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const Alexa = require("alexa-sdk");
const config_1 = require("./config");
exports.StartStateHandlers = Alexa.CreateStateHandler(models_1.HandlerStates.START, {
    'NewTimer': function (newTimer) {
    },
    'StartTimer': function () {
        let speechOutput = config_1.config.translations.en.WELCOME_MESSAGE;
        //--get the user
        //--check for and existing timer
        //--create a new timer if one does not exist
        //--set the current state to timer running
        this.handler.state = models_1.HandlerStates.RUNNING;
        this.emit(':tell', speechOutput);
        this.emit(':tellWithCard', speechOutput, 'Timer Started', speechOutput);
    }
});
exports.HelpStateHandlers = Alexa.CreateStateHandler(models_1.HandlerStates.HELP, {
    'HelpTheUser': function () {
        this.emit(':tell', 'Thanks for asking for help!');
    },
    'Unhandled': function () {
        this.emit(':tell', 'Thanks for asking for help!');
    }
});
