"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_alexa_mock_context_1 = require("azure-alexa-mock-context");
const Alexa = require("alexa-sdk");
exports.index = (context, req) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new azure_alexa_mock_context_1.Context('GameTimeTracker', context);
    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
    let handlers = {
        'LaunchRequest': function () {
            this.emit('StartTimerIntent');
        },
        'StartTimerIntent': function () {
            let datetime = new Date(this.event.request.timestamp);
            let hour = datetime.getHours() > 12 ? datetime.getHours() - 12 : datetime.getHours();
            let postfix = datetime.getHours() > 12 ? 'pm' : 'am';
            let minute = datetime.getMinutes();
            this.emit(':tell', `Timer started at ${hour}:${minute}${postfix}!`);
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
        }
    };
    alexa.registerHandlers(handlers);
    alexa.execute();
};
