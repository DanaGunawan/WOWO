import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { Env } from "../config/env.config";
import jwt from "jsonwebtoken";
import { validateChatParticipant } from "../services/chat.service";

interface authenticatedSocket extends Socket {
  userId?: string;
}

const onlineUser = new Map<string, string>();
let io: Server | null = null;

export const initializeSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: Env.FRONTEND_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket: authenticatedSocket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;
      if (!rawCookie) return next(new Error("unauthorized"));

      const token = rawCookie?.split("=")?.[1]?.trim();
      if (!token) return next(new Error("unauthorized"));

      const decodedToken = jwt.verify(token, Env.JWT_SECRET) as {
        userId: string;
      };
      if (!decodedToken) return next(new Error("unauthorized"));
      socket.userId = decodedToken.userId;
      next();
    } catch (e) {
      next(new Error("Internal Server Error"));
    }
  });

  io.on("connection", (socket: authenticatedSocket) => {
    if (!socket.userId) {
      socket.disconnect(true);
      return;
    }

    const userId = socket.userId!;
    const newSocketId = socket.id;
    console.log("socket connected", { userId, newSocketId });

    //register socket for the user
    onlineUser.set(userId, newSocketId);

    //user online broadcast to all socket
    io?.emit("online:users", Array.from(onlineUser.keys()));

    //create personal room
    socket.join(`userId : ${userId}`);

    socket.on(
      "chat:join",
      async (chatId: string, callback?: (Err?: string) => void) => {
        try {
          await validateChatParticipant(chatId, userId);
          socket.join(`chatId : ${chatId}`);
        } catch (e) {
          console.log(`Error : ${e}`);
        }
      },
    );

    socket.on("chat:leave", (chatId: string) => {
      if (chatId) {
        socket.leave(`chat: ${chatId}`);
        console.log(`user ${userId} left room chat`);
      }
    });

    socket.on("disconnect", () => {
      if (onlineUser.get(userId) == newSocketId) {
        if (userId) onlineUser.delete(userId);
        io?.emit("online user: ", Array.from(onlineUser.keys()));
        console.log(`socket disconnected: `, { userId, newSocketId });
      }
    });
  });
};

function getIO() {
  if (!io) throw new Error("socket io not initialized");
  return io;
}

export const emitNewChatParticipants = (
  participantsIds: string[] = [],
  chat: any,
) => {
  const io = getIO();
  for (const participantId of participantsIds) {
    io.to(`user participant: ${participantId}`).emit("chat:new", chat);
  }
};

export const emitLastMessageToParticipants = (
  allParticipantsIds: string[],
  chatId: string,
  lastMessage: any,
) => {
const io = getIO();
const payload = {chatId,lastMessage};

for (const participantId of allParticipantsIds){
  io.to(`user participant: ${participantId}`).emit('chat:update',payload)
}
};


export const emitNewMessageToChatRoom = (
  senderId: string,
  chatId: string,
  message: any,
) => {
  const io = getIO();
  const senderSocketId = onlineUser.get(senderId);

  if (senderSocketId) {
    io.to(`chat: ${chatId}`).except(senderSocketId).emit("message:new", message);
  } else {
    io.to(`chat: ${chatId}`).emit("message:new", message);
  }
};
