"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_alexa_mock_context_1 = require("azure-alexa-mock-context");
const Alexa = require("alexa-sdk");
exports.index = (context, req) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new azure_alexa_mock_context_1.Context('GameTimeTracker', context);
    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.5c2a5512-6992-4574-b57b-5c8c89989e87';
    let handlers = {};
    alexa.registerHandlers(handlers);
    alexa.execute();
};
