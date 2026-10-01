import { io, Socket } from "socket.io-client";
import { create } from "zustand";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_CLIENT_URL
    : "/";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocket = create<SocketState>()((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const { socket } = get();
    if (socket) return; // sudah ada koneksi (tersambung atau sedang menyambung)

    const newSocket = io(BASE_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    set({ socket: newSocket });

    newSocket.on("connect", () => {
      console.log(`socket connected ${newSocket.id}`);
    });

    newSocket.on("online:users", (userIds: string[]) => {
      console.log(`online users ${userIds}`);
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      console.log("socket disconnected");
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));