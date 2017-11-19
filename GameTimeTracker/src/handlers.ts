import { AlexaRequest } from './models';
import * as Alexa from 'alexa-sdk';

export const handlers: Alexa.Handlers<AlexaRequest> = {
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
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start or stop timer.', 'Try saying a check time.');
    }
}