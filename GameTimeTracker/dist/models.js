"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerStates;
(function (HandlerStates) {
    HandlerStates["RUNNING"] = "_RUNNINGTIMER";
    HandlerStates["START"] = "_STARTTIMER";
    HandlerStates["STOP"] = "_STOPTIMER";
    HandlerStates["STOPPED"] = "_STOPPEDTIMER";
    HandlerStates["HELP"] = "_HELPMODE"; //the user is asking for help
})(HandlerStates = exports.HandlerStates || (exports.HandlerStates = {}));
