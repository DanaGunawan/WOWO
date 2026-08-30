import { HTTP_STATUS, HttpStatusCodeType } from "../config/http.config";

export const errorCodes = {
    ERR_INTERNAL: "ERR_INTERNAL",
    ERR_FORBIDDEN: "ERR_FORBIDDEN",
    ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
    ERR_NOTFOUND : "ERR_NOTFOUND",
    ERR_BAD_REQUEST : "ERR_BAD_REQUEST"
} as const

export type errorCodeType = keyof typeof errorCodes;

export class appError extends Error{
    constructor(
        message:string,
        public statusCode: HttpStatusCodeType = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        public errorCode: errorCodeType = errorCodes.ERR_INTERNAL
    ){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
export class internalServerException extends appError{
    constructor(message:string ="INTERNAL SERVER ERROR"){
        super(message,HTTP_STATUS.INTERNAL_SERVER_ERROR,errorCodes.ERR_INTERNAL)
    }}

    export class badRequestException extends appError{
        constructor(message:string = "BAD REQUEST"){
            super(message,HTTP_STATUS.BAD_REQUEST,errorCodes.ERR_BAD_REQUEST)
    }}

    export class forbidden extends appError{
        constructor(message:string = "FORBIDDEN"){
            super(message,HTTP_STATUS.FORBIDDEN,errorCodes.ERR_FORBIDDEN)
        }
    }

    export class notFound extends appError{
        constructor(message:string = "NOT FOUND"){
            super(message,HTTP_STATUS.NOT_FOUND,errorCodes.ERR_NOTFOUND)
        }
    }

    export class unauthorized extends appError{
        constructor(message:string = "UNAUTHORIZED"){
            super(message,HTTP_STATUS.UNAUTHORIZED,errorCodes.ERR_UNAUTHORIZED)
        }
    }

    