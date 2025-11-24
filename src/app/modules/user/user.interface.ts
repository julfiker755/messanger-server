import { Document } from "mongoose";


export interface Tuser extends Document {
  name:string;
  email:string;
  password:string;
  avater?:string | null;
  createdAt: Date;
  updatedAt: Date;
}