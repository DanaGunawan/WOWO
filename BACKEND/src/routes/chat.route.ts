import { Router } from 'express'
import { passportAuthenticateJwt } from '../config/passport.config'
import { createChatController, getSingleChatController, getUserChatsController } from '../controllers/chat.controller'


const chatRoute = Router()
.use(passportAuthenticateJwt)
.post('/create', createChatController)
.get('/all', getUserChatsController )
.get('/:id', getSingleChatController )


export default chatRoute;


