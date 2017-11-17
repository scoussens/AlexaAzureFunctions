import { HttpContext, HttpRequest } from './azure.model';
import { Context } from 'azure-alexa-mock-context';
import * as Alexa from 'alexa-sdk';

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('GameTimeTracker', context);

    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
    let handlers: Alexa.Handlers<{}> = {

    }
    alexa.registerHandlers(handlers);
    alexa.execute();
}