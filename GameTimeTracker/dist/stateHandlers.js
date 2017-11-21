"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const Alexa = require("alexa-sdk");
exports.startStateHandlers = Alexa.CreateStateHandler(models_1.HandlerStates.START, {
    'NewTimer': function (newTimer) {
    },
    'StartTimer': function () {
    }
});
