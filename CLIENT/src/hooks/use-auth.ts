import { API } from "@/lib/axios-client";
import type { loginType, registerType, userType } from "@/types/auth.type";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSocket } from "./use-socket";

interface AuthState {
  user: userType | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isAuthStatusLoading: boolean;

  register: (data: registerType) => void;
  login: (data: loginType) => void;
  logout: () => void;
  isAuthStatus: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isSigningUp: false,
      isLoggingIn: false,
      isAuthStatusLoading: false,

      register: async (data: registerType) => {
        set({ isSigningUp: true });
        try {
          const response = await API.post("/auth/register", data);
          set({ user: response.data.user });
          useSocket.getState().connectSocket();
          toast.success("register and login succesfully")
        } catch (err: any) {
          toast.error(err.response.data.message || err.message);
        } finally {
          set({ isSigningUp: false });
        }
      },
      login: async (data: loginType) => {
        set({ isLoggingIn: true });
        await API.post("/auth/login", data)
          .then((response) => {
            set({ user: response.data.user });
            useSocket.getState().connectSocket();
            toast.success("login succesfully")
          })
          .catch((err) => {
            toast.error(err.response.data.message || "login failed");
          })
          .finally(() => {
            set({ isLoggingIn: false });
          });
      },
      logout: async () => {
        try {
          await API.post("/auth/logout").then(() => {
            set({ user: null });
          });
          useSocket.getState().disconnectSocket();
        } catch (err: any) {
          toast.error(err.response.data.message || err.message);
        }
      },
      isAuthStatus: async () => {
        set({isAuthStatusLoading : true})
        try{
          const response =  await API.post("/auth/status")
          set({user: response?.data?.user})
          useSocket.getState().connectSocket()
        }
        catch(err :any){
            toast.error(err.response.data.message || err.message)
        }
        finally{
            set({isAuthStatusLoading: false})
        }
      },
    }),
    {
      name: "whop:root",
    },
  ),
);
