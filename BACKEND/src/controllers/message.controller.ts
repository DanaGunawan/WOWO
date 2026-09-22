import { Request, Response} from 'express'
import { AsyncHandler } from '../middlewares/asyncHandler.Middleware'
import { createMessageSchema } from '../validators/message.validator'
import { HTTP_STATUS } from '../config/http.config'
import { sendMessageService } from  '../services/message.service'

export const sendMessageController = AsyncHandler(async(req:Request, res:Response) => {
    const userId = req.user?._id
    const body = createMessageSchema.parse(req.body)

    const result = await sendMessageService(userId,body)

    res.status(HTTP_STATUS.OK).json({
        message: "Message Sended Succesfully",
        ...result
    })

})