import { getEnv } from "../utils/get-env";

export const Env = {
    NODE_ENV : getEnv("NODE_ENV","development"),
    PORT     : getEnv("PORT","8000"),
    JWT_SECRET :getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN : getEnv("JWT_EXPIRES_IN", "7d"),
    MONGO_URI :getEnv("MONGO_URI"),
    FRONTEND_ORIGIN : getEnv("FRONTEND_ORIGIN")
} as const;