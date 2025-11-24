import { Trole } from "../app/modules/user/user.interface";


export interface Tuser {
  email: string;
  role:Trole;
  iat: number; 
  exp: number; 
}



