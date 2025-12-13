import ApiCustomError from '@/app/errors/apiCustomError';
import { userModel } from '../user/user.model';
import { chatModel } from './chat.model';
import { MessageModel } from '../message/message.model';

//  ============ chatStoreBD ==============
const chatStoreBD = async (userId: string, payload: any) => {
  const { participantsId, isGroup, participants = [], groupName } = payload || {};

  //   ================== group  ================
  if (isGroup) {
    if (!participants.length || !groupName) {
      throw new ApiCustomError('Invalid group data', [
        { field: 'group', code: 'invalid_type', message: 'Group must have participants and a name' },
      ]);
    }

    return chatModel
      .create({
        participants: [userId, ...participants],
        isGroup: true,
        groupName,
        createdBy: userId,
      })
      .then(chat => chat.populate('participants', 'name avatar'));
  }
//   ============ private chat ===============
  if (!participantsId && !isGroup) {
    throw new ApiCustomError('Invalid payload', [
      { field: 'payload', code: 'invalid_type', message: 'Provide either participantsId or group data' },
    ]);
  }

  const otherUser = await userModel.findById(participantsId);
  if (!otherUser) {
    throw new ApiCustomError('User not found', [
      { field: 'user', code: 'invalid_type', message: 'User not found' },
    ]);
  }

  const participantsArr = [userId, participantsId];

  const existingChat = await chatModel
    .findOne({ participants: { $all: participantsArr, $size: 2 } })
    .populate('participants', 'name avatar');

  if (existingChat) return existingChat;

  return chatModel
    .create({
      participants: participantsArr,
      isGroup: false,
      createdBy: userId,
    })
    .then(chat => chat.populate('participants', 'name avatar'));
};



//  ================ getUserChatBD ===============
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
  }).sort({createdAt:-1})
  return {
    chat,
    messages
  }
};

export const chatService = {
  chatStoreBD,
  getUserChatBD,
  getUserSingleChatBD,
};
