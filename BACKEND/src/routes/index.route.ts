import { Router } from "express";
import authRoutes from "./auth.route";
import chatRoutes from "./chat.route"
import userRoutes from "./user.route"


const routes = Router()
routes.use('/auth', authRoutes);
routes.use('/chat', chatRoutes);
routes.use('/user', userRoutes)

export default routes