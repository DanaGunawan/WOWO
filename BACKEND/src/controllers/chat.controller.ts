import { AsyncHandler } from "../middlewares/asyncHandler.Middleware";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../config/http.config";
import { chatIdSchema, createChatSchema } from "../validators/chat.validator";
import { createChatService } from "../services/chat.service";
import { getUserChatsService } from "../services/chat.service";
import { getSingleChatService } from "../services/chat.service";

export const createChatController = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = createChatSchema.parse(req.body);
    const chat = createChatService(userId, body);

    return res.status(HTTP_STATUS.OK).json({
      message: "chat retrieved successfully",
      chat,
    });
  },
);

export const getUserChatsController = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const chats = getUserChatsService(userId);

    return res.status(HTTP_STATUS.OK).json({
      message: "User Chat Retrieved Successfully",
      chats,
    });
  },
);


export const getSingleChatController = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id: chatId } = chatIdSchema.parse(req.params);

    const { chat, messages } = await getSingleChatService(chatId, userId);

    return res.status(HTTP_STATUS.OK).json({
      message: "Chat Retrieved successfully",
      chat,
      messages,
    });
});

