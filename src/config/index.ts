import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshExpire: process.env.REFRESH_TOKEN_EXPIRATION,
  },
};
