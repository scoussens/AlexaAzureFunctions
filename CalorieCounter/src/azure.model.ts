export interface IFunctionRequest {
    body: any;
    method: string;
    data: any;
    params: any;
}

export interface HttpContext {
    res: any;
    done(err: any, callback?: any): void;
    log(message: any): void;
}

export interface TimerContext {
    isPastDue: boolean;
}

export const HttpStatusCodes = {
    OK: 200,
    NotFound: 404,
    Unauthorized: 401,
    Error: 500
}