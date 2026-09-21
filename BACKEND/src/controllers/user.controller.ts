import { HTTP_STATUS } from "../config/http.config";
import { AsyncHandler } from "../middlewares/asyncHandler.Middleware";
import { Request, Response } from "express";
import { getUserService } from "../services/user.service";

export const getUserController = AsyncHandler(async(req: Request, res: Response) => {
    const userId = req.user?._id

    const user = getUserService(userId)

    return res.status(HTTP_STATUS.OK).json({
        message: 'user data retrieved succesfully',
        user,
    })
});
