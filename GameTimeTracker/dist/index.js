"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_alexa_mock_context_1 = require("azure-alexa-mock-context");
const Alexa = require("alexa-sdk");
const handlersNewSession_1 = require("./handlersNewSession");
const APP_PERMISSIONS = ['read::alexa:device:all:address'];
const APP_ID = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
const APP_SECRET = '13bc80bcd3ef2d5f4bfb504b0b9e96c997c408f567fbaa8b95a431566ff0828a';
exports.index = (context, req) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new azure_alexa_mock_context_1.Context('GameTimeTracker', context);
    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlersNewSession_1.NewSessionHandlers);
    alexa.execute();
};
