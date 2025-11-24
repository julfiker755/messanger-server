import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt:{
    secret:process.env.JWT_SECRET,
    accessTokenExp:process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExp:process.env.REFRESH_TOKEN_EXPIRATION,
    resetPasswordExp:process.env.RESET_PASSWORD_EXPIRATION,
 }
};
