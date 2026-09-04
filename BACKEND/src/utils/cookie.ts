import jwt from "jsonwebtoken";
import { Response } from "express";
import { Env } from "../config/env.config";

type time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

type cookie = {
    res:Response,
    userId:string
}


export const setJwtAuthCookie = ({res,userId}:cookie) => {
    const payload = {userId};
    const expiresIn = Env.JWT_EXPIRES_IN as time;
    const token = jwt.sign(payload, Env.JWT_SECRET, {
        audience: ['user'],
        expiresIn: expiresIn || '7d',
    })

    return res.cookie(
    "accessToken", token, {
       maxAge: 7 * 24 * 60 * 60 * 1000,
       httpOnly:true,
       secure: Env.NODE_ENV === "production" ? true : false,
       sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
    }
)
}

export const clearJwtAuthToken = (res: Response) => res.clearCookie("accessToken");
