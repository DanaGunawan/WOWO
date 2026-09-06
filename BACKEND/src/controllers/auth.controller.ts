import { Request, Response} from 'express'
import { AsyncHandler } from '../middlewares/asyncHandler.Middleware'
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { loginService, registerService } from '../services/auth.service';
import { clearJwtAuthToken, setJwtAuthCookie } from '../utils/cookie';
import { HTTP_STATUS } from '../config/http.config';


export const registerController = AsyncHandler(
    async(req:Request, res:Response) => {
    const body = registerSchema.parse(req.body);
    const user =  await registerService(body)
    const userId  = user._id.toString()
    
    setJwtAuthCookie({res,userId})
    .status(HTTP_STATUS.CREATED)
    .json({
        message: 'user register and login succesfully',
        user: user
    })
    }
)

export const loginController = AsyncHandler(
    async(req:Request, res:Response) => {
    const body = loginSchema.parse(req.body);
    const user =  await loginService(body)
    const userId  = user._id.toString()
    
    setJwtAuthCookie({res,userId})
    .status(HTTP_STATUS.OK)
    .json({
        message: 'login succesfully',
        user: user
    })
    }
)

export const logoutController = AsyncHandler(async (req:Request, res:Response) => {
    clearJwtAuthToken(res).status(HTTP_STATUS.OK).json({message: 'logout successfully'})
})