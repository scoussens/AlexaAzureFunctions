"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alexa = require("alexa-sdk");
var APP_ID = undefined;
var SKILL_NAME = 'Space Facts';
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
var HELP_REPROMPT = 'What can I help you with?';
var STOP_MESSAGE = 'Goodbye!';
var data = [
    'A year on Mercury is just 88 days long.',
    'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
    'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
    'On Mars, the Sun appears about half the size as it does on Earth.',
    'Earth is the only planet not named after a god.',
    'Jupiter has the shortest day of all the planets.',
    'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The Sun is an almost perfect sphere.',
    'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
    'Saturn radiates two and a half times more energy into space than it receives from the sun.',
    'The temperature inside the Sun can reach 15 million degrees Celsius.',
    'The Moon is moving approximately 3.8 cm away from our planet every year.',
];
exports.index = function (context, req) {
    context.log(JSON.stringify(req, null, 2));
    var request = req.body;
    var ctx = req.body.context;
    var alexa = Alexa.handler(request, ctx);
    alexa.appId = '';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
var handlers = {
    'LaunchRequest': function () {
        var self = this;
        self.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var self = this;
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var output = GET_FACT_MESSAGE + randomFact;
        self.emit(':tellWithCard', output, ':responseReady', output);
    },
    'AMAZON.HelpIntent': function () {
        var self = this;
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        self.emit(':responseReady', HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        var self = this;
        self.emit(':responseReady', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        var self = this;
        self.emit(':responseReady', STOP_MESSAGE);
    },
};
