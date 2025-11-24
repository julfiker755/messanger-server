import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';
import { BcryptStore } from '@/ulits';


const userSchema = new Schema<Tuser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required:true},
    password: { type: String, required: true },
    avater:{type:String ,default:null}
  },
  {
    timestamps: true,
    toJSON:{
      transform:(doc,ret)=>{
        if(ret){
          delete ret.password;
          delete ret.__v
        }
        return ret
      }
      
    }
  },
);

userSchema.pre('save', async function (next) {
  this.password =await BcryptStore(this.password, 10);
  next()
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const userModel = model<Tuser>('user', userSchema);

