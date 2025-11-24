import mongoose, { Document } from 'mongoose';

export interface Tmessage extends Document {
  chatId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content?: string;
  image?: string;
  replyTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date; 
}

