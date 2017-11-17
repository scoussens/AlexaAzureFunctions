"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const azure_alexa_mock_context_1 = require("azure-alexa-mock-context");
const Alexa = require("alexa-sdk");
exports.index = (context, req) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new azure_alexa_mock_context_1.Context('GameTimeTracker', context);
    let alexa = Alexa.handler(req.body, awsContext);
    alexa.appId = 'amzn1.ask.skill.bfdb16dc-14e9-41d9-b8b4-e26262ca3858';
    let handlers = {};
    alexa.registerHandlers(handlers);
    alexa.execute();
};
