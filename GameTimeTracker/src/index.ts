import { HttpContext, HttpRequest } from './azure.model';
import { Context } from 'azure-alexa-mock-context';
import * as Alexa from 'alexa-sdk';

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('GameTimeTracker', context);

    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.bfdb16dc-14e9-41d9-b8b4-e26262ca3858';
    let handlers: Alexa.Handlers<{}> = {

    }
    alexa.registerHandlers(handlers);
    alexa.execute();
}