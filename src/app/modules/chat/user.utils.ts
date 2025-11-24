import jwt from 'jsonwebtoken';

export const createToken=(jwtPaylod:any,secret:string, expires:any)=>{
 return jwt.sign(
    {
      jwtPaylod,
    },
   secret,
    { expiresIn:expires },
  );
}