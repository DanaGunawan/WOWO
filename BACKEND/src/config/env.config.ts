import { getEnv } from "../utils/get-env";


export const Env = {
    NODE_ENV : getEnv("NODE_ENV","development"),
    PORT     : getEnv("PORT","8000"),
    JWT_SECRET :getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN : getEnv("JWT_EXPIRES_IN", "7d"),
    MONGO_URI :getEnv("MONGO_URI"),
    FRONTEND_ORIGIN : getEnv("FRONTEND_ORIGIN"),

    //cloudinary
    CLOUDINARY_NAME: getEnv("CLOUD_NAME"),
    CLOUDINARY_API_KEY: getEnv("CLOUD_API_KEY"),
    CLOUDINARY_API_SECRET : getEnv("CLOUD_API_SECRET")
} as const;