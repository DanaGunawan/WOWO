import {Server as HttpServer} from "http"
import {Server, Socket} from 'socket.io'
import { Env } from "../config/env.config"
import jwt from "jsonwebtoken"

interface authenticatedSocket extends Socket{
    userId?:string
}



let io : Server | null = null
export const initializeSocket = (httpServer : HttpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: Env.FRONTEND_ORIGIN,
            methods: ['GET', 'POST'],
            credentials: true
        },
    });

    io.use(async(socket: authenticatedSocket, next) => {
        try{
            const rawCookie = socket.handshake.headers.cookie;
            if(!rawCookie) return next(new Error('unauthorized'))
            
            const token = rawCookie?.split('=')?.[1]?.trim()
            if(!token) return next(new Error('unauthorized'))

            const decodedToken = jwt.verify(token,Env.JWT_SECRET) as {
                userId:string
            }
            if(!decodedToken) return next(new Error('unauthorized'))
            socket.userId = decodedToken.userId
            next()
        }
        catch(e){
            next(new Error("Internal Server Error"))
        }
    });

    io.on('connection', (socket: authenticatedSocket) => {
        const userId = socket.userId!
        const newSocketId = socket.id

        console.log("socket connected", {userId, newSocketId})

        if(!socket.userId){
            socket.disconnect(true)
            return
        }

    })
};