import * as Alexa from 'alexa-sdk';
import { HttpContext, HttpRequest } from './azure.model';
import { Context } from 'azure-alexa-mock-context';

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

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('CalorieCounter', context);

    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.bfdb16dc-14e9-41d9-b8b4-e26262ca3858';
    let handlers: Alexa.Handlers<{}> = {
        "AboutIntent": function() {
            let output: string = 'This skill was created by Seth Coussens @sethcoussens';
            this.emit(":tellWithCard", output, "GetNewFactIntent", output);
        },
        'GetNewFactIntent': function() {
            const factArr = data;
            const factIndex = Math.floor(Math.random() * factArr.length);
            const randomFact = factArr[factIndex];
            const speechOutput = GET_FACT_MESSAGE + randomFact;
            this.emit(':tellWithCard', randomFact, ':responseReady', speechOutput);
        }
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
}

function GetNewFact() {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    return factArr[factIndex];
}