import { AlexaRequest } from './models';
import { HttpContext, HttpRequest } from './azure.model';
import { Context } from 'azure-alexa-mock-context';
import * as Alexa from 'alexa-sdk';
import * as moment from 'moment';
import { NewSessionHandlers } from './handlersNewSession';
import { StartStateHandlers, HelpStateHandlers } from './handlersState';

const APP_PERMISSIONS = ['read::alexa:device:all:address'];
const APP_ID = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
const APP_SECRET = '13bc80bcd3ef2d5f4bfb504b0b9e96c997c408f567fbaa8b95a431566ff0828a';

export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('GameTimeTracker', context);

    let alexa = Alexa.handler<AlexaRequest>(req.body, awsContext);
    alexa.appId = APP_ID;
    alexa.registerHandlers(NewSessionHandlers, StartStateHandlers, HelpStateHandlers);
    alexa.execute();
}