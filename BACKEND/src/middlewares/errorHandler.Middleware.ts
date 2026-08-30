import { ErrorRequestHandler } from "express"
import { HTTP_STATUS } from "../config/http.config"
import { errorCodes } from "../utils/error-app"
import { appError } from "../utils/error-app"


export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
    console.log(`ERROR from path ${req.path} detail ${error}`)

    if(error instanceof appError){
        return res.status(error.statusCode).json({message:error.message, error: error.errorCode})
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        {message : "internal server error", error: error?.message || "something went wrong",errorCode: errorCodes.ERR_INTERNAL}
    )
}
