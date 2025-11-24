import { Schema, model } from 'mongoose';
import { Tchat } from './user.interface';

const userSchema = new Schema<Tchat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],

    lastMessage: [
      {
        type: Schema.Types.ObjectId,
        ref: 'message',
        required: true,
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      required: true,
    },
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  },
);

export const chatModel = model<Tchat>('chat', userSchema);
