export interface AlexaRequest {
    type: string,
    requestId: string,
    intent: {
      name: string
      slots: any
    },
    locale: string
    timestamp: string
}

export enum HandlerStates {
    RUNNING = '_RUNNINGTIMER',   //timer is actively running
    START = '_STARTTIMER', 
    STOP = '_STOPTIMER',      //entry point for the application
    STOPPED = '_STOPPEDTIMER',   //timer is currently stopped
    HELP = '_HELPMODE'           //the user is asking for help
}