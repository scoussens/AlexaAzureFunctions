import * as Alexa from 'alexa-sdk';
import { HttpContext, HttpRequest } from './azure.model';
import AzureContext from './azure-context';

const APP_ID = undefined;
const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Madeleine should brush her hair, as she does not do that often.'
];

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new AzureContext('CalorieCounter', context);

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

    // context.res = {
    //     status: 200,
    //     body: {
    //         version: "1.0",
    //         sessionAttributes: {},
    //         response: {
    //             outputSpeech: {
    //                 type: "PlainText",
    //                 text: GetNewFact()
    //             },
    //             card: {
    //                 type: "Simple",
    //                 title: "GetNewFactIntent",
    //                 content: "Dad rocks!"
    //             },
    //             shouldEndSession: true
    //         }
    //     }
    // }

    // context.done(null)
}

function GetNewFact() {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    return factArr[factIndex];
}