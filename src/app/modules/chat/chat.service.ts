import ApiCustomError from '@/app/errors/apiCustomError';
import { userModel } from '../user/user.model';
import { chatModel } from './chat.model';
import { MessageModel } from '../message/message.model';

const chatStoreBD = async (userId: string, payload: any) => {
  const { participantsId, isGroup, participants, groupName, createdBy } =
    payload || {};
  let chat: any;
  let allParticipantsIds: any[] = [];

  if (isGroup && participants?.length && groupName) {
    allParticipantsIds = [userId, ...participants];
    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: true,
      groupName,
      createdBy: userId,
    });
  } else if (participantsId) {
    const otherUser = await userModel.findById(participantsId);
    if (!otherUser) {
      throw new ApiCustomError('User not found', [
        {
          field: 'user',
          code: 'invalid_type',
          message: 'User not found',
        },
      ]);
    }
    allParticipantsIds = [userId, participantsId];
    const exsistingChat = await chatModel
      .findOne({
        participants: {
          $all: allParticipantsIds,
          $size: 2,
        },
      })
      .populate('participants', 'name avatar');
    if (exsistingChat) return exsistingChat;
    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: false,
      createdBy: userId,
    });
  }
  return chat;
};

const getUserChatBD = async (userId: string) => {
  const chats = await chatModel
    .find({
      participants: {
        $in: [userId],
      },
    })
    .populate('participants', 'name avatar')
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'sender',
        select: 'name avatar',
      },
    })
    .sort({ updatedAt: -1 });

  return chats;
};

//  ========= getUserSingleChatBD ============
const getUserSingleChatBD = async (chatId: string, userId: string) => {
  const chat = await chatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });
  if (!chat) {
    throw new ApiCustomError('chat Error', [
      {
        field: 'chat',
        code: 'invalid_type',
        message: 'chat not found',
      },
    ]);
  }
  const messages=await MessageModel.find({chatId}).populate("sender").populate({
    path:"replyTo",
    select:"content image sender",
    populate:{
      path:"sender",
      select:"name avatar"
    }
  })
};

export const chatService = {
  chatStoreBD,
  getUserChatBD,
  getUserSingleChatBD,
};
