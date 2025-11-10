import config from "@/config";
import ApiGlobalError from "@/errors/apiGlobalError";
import { jwtHelpers, prisma } from "@/helpers";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUpAuth = async (data: any) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: data.email,
      //   status: userStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiGlobalError("user email Error", [
      {
        field: "email",
        code: "invalid_type",
        message: "User not found",
      },
    ]);
  }

  const isCorrectPassword: Boolean = await bcrypt.compare(
    data.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiGlobalError("user Password Error", [
      {
        field: "password",
        code: "invalid_type",
        message: "Password is not vaild",
      },
    ]);
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.accessExpire as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.refreshExpire
  );
  return {
    accessToken,
    refreshToken,
  };
};

//   refreshToken
// const refreshToken = async (token: string) => {
//   let decodedToken;
//   try {
//     decodedToken = jwtHelpers.varifyToken(token, config.jwt.secret as Secret);
//   } catch (err) {
//     throw new Error("You do not have permission.");
//   }
//   const isUserExsis = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: decodedToken.email,
//       status: userStatus.ACTIVE,
//     },
//   });
//   const accessToken = jwtHelpers.generateToken(
//     {
//       email: isUserExsis.email,
//       role: isUserExsis.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.refreshTokenExpiration
//   );

//   return {
//     accessToken,
//     needPasswordChange: isUserExsis.needPasswordChange,
//   };
// };

export const authService = {
  signUpAuth,
};
