// participants: mongoose.Types.ObjectId[];
// lastMessage: mongoose.Types.ObjectId;
// isGroup: boolean;
// groupName: string;
// createdBy: mongoose.Types.ObjectId;
// createdAt: Date;
// updatedAt: Date;

import ApiCustomError from '@/app/errors/apiCustomError';
import { userModel } from '../user/user.model';
import { chatModel } from './chat.model';

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

export const chatService = {
  chatStoreBD,
};
