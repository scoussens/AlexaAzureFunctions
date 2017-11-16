import * as Alexa from 'alexa-sdk';
import { LaunchRequest } from 'alexa-sdk';

const APP_ID = undefined;
const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
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

export const index = (context: any, req: any) => {
    context.log(JSON.stringify(req, null, 2));

    let request = req.body as Alexa.RequestBody<{}>;
    let ctx = req.body.context;
    const alexa = Alexa.handler(request, ctx);
    alexa.appId = '';
    alexa.registerHandlers(handlers);
    alexa.execute();
}

const handlers: Alexa.Handlers<{}> = {
    'LaunchRequest': function () {
        let self: Alexa.Handler<{}> = this;
        self.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        let self: Alexa.Handler<{}> = this;
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const output = GET_FACT_MESSAGE + randomFact;
        self.emit(':tellWithCard', output, ':responseReady', output);
    },
    'AMAZON.HelpIntent': function () {
        let self: Alexa.Handler<{}> = this;
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        self.emit(':responseReady', HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        let self: Alexa.Handler<{}> = this;
        self.emit(':responseReady', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        let self: Alexa.Handler<{}> = this;
        self.emit(':responseReady', STOP_MESSAGE);
    },
};