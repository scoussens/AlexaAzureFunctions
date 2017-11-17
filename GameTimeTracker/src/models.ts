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