import chatModel from "../models/chat.model";
import userModel from "../models/user.model";
import messageModel from "../models/message.model";
import { badRequestException, notFound } from "../utils/error-app";
import { emitNewChatParticipants } from "../lib/socket";

export const createChatService = async (
  userId: string,
  body: {
    participantId?: string;
    isGroup?: boolean;
    participants?: string[];
    groupName?: string;
  },
) => {
  const { participantId, isGroup, participants, groupName } = body;

  let chat;
  let allParticipantsIds: string[] = [];

  if (isGroup && participantId?.length && groupName) {
    allParticipantsIds = [userId, ...allParticipantsIds];

    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: true,
      groupName: groupName,
      createdBy: userId,
    });
  } else if (participantId) {
    const otherUser = await userModel.findById(participantId);
    if (!otherUser) throw new notFound("User Not Found");

    allParticipantsIds = [userId, participantId];
    const existingChat = chatModel
      .findOne({
        participants: allParticipantsIds,
        $size: 2,
      })
      .populate("participants", "name avatar");

    if (existingChat) return existingChat;

    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: false,
      createdBy: userId,
    });

    //implemend web socket
    const populatedChat = await chat?.populate("participants", "name avatar")
    const participantIdStrings = populatedChat?.participants?.map((p) => {
      return p._id.toString()
    })

    emitNewChatParticipants(participantIdStrings,populatedChat)
    return chat;
  }
};

export const getUserChatsService = async (userId: string) => {
  let chats = await chatModel.find({
    participants: {
      $in: [userId],
    },
  }).populate('participants' , 'name avatar')
  .populate({
    path: "lastMessage",
    populate: {
        path: "sender",
        select: "name avatar"
    }
  })
  .sort({updatedAt : -1})
return chats
};

export const getSingleChatService = async(chatId: string, userId: string) => {
    const chat = await chatModel.findOne({
        id: chatId,
        participants: {
            $in : userId
        }
    })

    if(!chat){
        throw new badRequestException('u are not allowed to see this request')
    }

    const messages = await messageModel.find({
        id: chatId
    }).populate("sender", "name avatar")
    .populate({
        path: "replyTo",
        select : "content image sender",
        populate: {
            path: "sender",
            select: "name avatar"
        }
    }).sort({
        createdAt: 1
    })

    return {
        messages,
        chat
    }
}

    export const validateChatParticipant = async(
      chatId : string,
      userId : string
    ) => {

      const chat = await chatModel.findOne({
        id: chatId,
        participants: 
        {
          $ne : userId
        }
      })

      if(!chat) return new badRequestException('user not participant in a chat')
      return chat;
    }
