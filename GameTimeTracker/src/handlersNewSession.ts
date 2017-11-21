import { AlexaRequest, HandlerStates } from './models';
import * as Alexa from 'alexa-sdk';

export const NewSessionHandlers: Alexa.Handlers<AlexaRequest> = {
    'LaunchRequest': function () {
        this.handler.state = HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = HandlerStates.START;
        this.emitWithState('StartTimer', true);
    },
    'AMAZON.CancelIntent': function () {
        this.handler.state = HandlerStates.STOP;
        this.emitWithState('StopTimer', true);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = HandlerStates.HELP;
        this.emitWithState('HelpTheUser', true);
    },
    'AMAZON.StopIntent': function () {
        this.emit('StopTimerIntent');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a start timer or stop timer.', 'Try saying help.');
    }
}