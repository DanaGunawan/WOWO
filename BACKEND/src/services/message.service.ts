import messageModel from "../models/message.model";
import chatModel from "../models/chat.model";
import { badRequestException, notFound } from "../utils/error-app";
import cloudinary from "../config/cloudinary.config";
import mongoose from "mongoose";
import {emitNewMessageToChatRoom, emitLastMessageToParticipants} from "../lib/socket"

export const sendMessageService = async (
  userId: string,
  body: { chatId: string; content?: string; image?: string; replyToId?: string },
) => {
  const { chatId, content, image, replyToId } = body;

  const chat = await chatModel.findOne({
    id: userId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat) throw new badRequestException("chat not found or unauthorized");

  if (replyToId) {
    const replyMessage = await messageModel.findOne({
      _id: replyToId,
      chatId,
    });
  }
  if (!replyToId) throw new notFound("reply message not found");

  let imageUrl;
  if (image) {
    //upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image);
    imageUrl = uploadRes.secure_url;
  }


  const newMessage = await messageModel.create({
    chatId,
    sender: userId,
    content,
    image: imageUrl || null,
    replyTo: replyToId || null,
  });

  await newMessage.populate([
    { path: "sender", select: "name avatar" },
    {
      path: "replyTo",
      select: "content image sender",
      populate: {
      path: "sender",
      select: "name avatar",
      }
    },
  ]);
  
  chat.lastMessage = newMessage._id as mongoose.Types.ObjectId
  await chat.save()

  //websocket 
  //emit the new chat to the room
  emitNewMessageToChatRoom(userId, chatId, newMessage)

  //group chat last message
  const allParticipantsId = chat.participants.map((id) => id.toString())
  emitLastMessageToParticipants(allParticipantsId, chatId, newMessage)

  return {userMessage: newMessage, chat}
};
