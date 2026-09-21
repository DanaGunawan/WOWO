import "dotenv/config";
import express,{ Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Env } from "./config/env.config";
import { AsyncHandler } from "./middlewares/asyncHandler.Middleware";
import { HTTP_STATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.Middleware";
import DatabaseConnection from "./config/database.config";

import "./config/passport.config";
import routes from "./routes/index.route";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)
app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);


app.get('/health', AsyncHandler(async (req:Request, res:Response) => {
    res.status(HTTP_STATUS.OK).json({
        message: "healthy",
        statusCode: "OK"
    });
}));

app.use('/api/v1', routes);

app.listen(Env.PORT, async () => {
  await DatabaseConnection()
    console.log(`app is running on port ${Env.PORT} and keep grinding hard `);
})