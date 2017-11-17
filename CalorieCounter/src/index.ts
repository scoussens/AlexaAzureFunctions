import * as Alexa from 'alexa-sdk';
import { HttpContext, HttpRequest } from './azure.model';
import AzureContext from './azure-context';

const SKILL_NAME = 'Coussens Greeter';
const APP_ID = 'amzn1.ask.skill.bfdb16dc-14e9-41d9-b8b4-e26262ca3858';
const GET_GREETING_PREFIX = "Here's your greeting: ";
const HELP_MESSAGE = 'You can say tell me a greeting, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    `Hey.`,
    `Hey man.`, 
    `Hi.`,
    `How's it going? ...`,
    `What's up?`,
    `What's new?`,
    `What's going on?`,
    `How's everything?`,
    `How are things?`,
    `How's life?`,
    `How's your day?`,
    `How's your day going?`,
    `Long time no see.`,
    `It's been a while.`,
    `Good morning.`,
    `Good afternoon.`,
    `Good evening.`
];

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new AzureContext('CalorieCounter', context);

    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = APP_ID;
    let handlers: Alexa.Handlers<{}> = {
        "AboutIntent": function() {
            let output: string = 'This skill was created by Seth Coussens @sethcoussens';
            this.emit(":tellWithCard", output, `About ${SKILL_NAME}`, output);
        },
        'GetNewGreetingIntent': function() {
            const factArr = data;
            const factIndex = Math.floor(Math.random() * factArr.length);
            const randomGreeting = factArr[factIndex];
            const speechOutput = GET_GREETING_PREFIX + randomGreeting;
            this.emit(':tellWithCard', speechOutput, 'Greeting', randomGreeting);
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