import { HandlerStates } from "./models";
import * as Alexa from 'alexa-sdk';
import { config } from './config';

export const StartStateHandlers = Alexa.CreateStateHandler(HandlerStates.START, {
    'NewTimer': function(newTimer: any) {

    },
    'StartTimer': function() {
        let speechOutput = config.translations.en.WELCOME_MESSAGE;
        //--get the user
        //--check for and existing timer
        //--create a new timer if one does not exist
        //--set the current state to timer running
        this.handler.state = HandlerStates.RUNNING;
        this.emit(':tell', speechOutput);
        this.emit(':tellWithCard', speechOutput, 'Timer Started', speechOutput);
    }
})

export const HelpStateHandlers = Alexa.CreateStateHandler(HandlerStates.HELP, {
    'HelpTheUser': function () {
        this.emit(':tell', 'Thanks for asking for help!');
    },
    'Unhandled': function() {
        this.emit(':tell', 'Thanks for asking for help!');
    }
})