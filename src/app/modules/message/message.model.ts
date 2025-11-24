import mongoose from 'mongoose';
import { Tmessage } from './message.interface';


const messageSchema = new mongoose.Schema<Tmessage>(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'chat',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    content: { type: String },
    image: { type: String },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'message' },
  },
  { timestamps: true },
);

export const Message = mongoose.model<Tmessage>('message', messageSchema);
