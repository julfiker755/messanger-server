import ApiCustomError from '@/app/errors/apiCustomError';
import QueryBuilder from '@/app/builder/queryBuilder';
import { jwtHelpers } from '@/helpers/jwtHelpers';
import { userModel } from './user.model';
import { BcryptCompare } from '@/ulits';
import config from '@/app/config';

const userGetBD = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(userModel.find(), query)
    .filter()
    .paginate()
    .sort();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    result,
    meta,
  };
};

const userStoreBD = async (payload: any) => {
  const exsisUser = await userModel.findOne({ email: payload.email });
  if (exsisUser) {
    throw new ApiCustomError('User Exsis', [
      {
        field: 'user',
        code: 'invalid_type',
        message: 'User Already Exsis',
      },
    ]);
  }
  const result = await userModel.create(payload);
  return result;
};

const loginUserBD = async (payload: any) => {
  const { email, password } = payload;
  const result = await userModel.findOne({ email: email });
  if (!result) {
    throw new ApiCustomError('user email Error', [
      {
        field: 'email',
        code: 'invalid_type',
        message: 'User not found',
      },
    ]);
  }
  if (password) {
    const passwordMatch = await BcryptCompare(password, result?.password);
    if (!passwordMatch) {
      throw new ApiCustomError('user password Error', [
        {
          field: 'password',
          code: 'invalid_type',
          message: 'User password not match',
        },
      ]);
    }
  }
  const payloadData = {
    email: result?.email,
    id: result._id,
  };
  const accessToken = jwtHelpers.generateToken(
    payloadData,
    config.jwt.secret,
    config.jwt.accessTokenExp,
  );

  return {
    data: result,
    accessToken,
  };
};

export const userService = {
  userGetBD,
  userStoreBD,
  loginUserBD,
};
