import type { loginType, registerType, userType } from "@/types/auth.type";
import { create } from "zustand";


interface AuthState {
    user : userType | null,
    isLoggingIn : boolean,
    isSigningUp: boolean,
    isAuthStatusLoading: boolean,

    register: (data: registerType) => void,
    login: (data: loginType) => void,
    logout: () => void
    
}