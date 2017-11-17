import { HttpContext, HttpRequest } from './azure.model';
import { Context } from 'azure-alexa-mock-context';
import * as Alexa from 'alexa-sdk';

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('GameTimeTracker', context);

    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
    let handlers: Alexa.Handlers<{}> = {
        'LaunchRequest': function () {
            this.emit('StartTimerIntent');
        },
        'StartTimerIntent': function () {
            this.emit(':tell', 'Timer started!');
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
    }
    alexa.registerHandlers(handlers);
    alexa.execute();
}