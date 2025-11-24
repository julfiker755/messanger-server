import bcrypt from 'bcrypt';

export const BcryptStore = async (password: any, value: number) => {
  return await bcrypt.hash(password, value);
};
export const BcryptCompare = async (plainPassword:string, hashPassword:string) => {
  return await bcrypt.compare(plainPassword,hashPassword);
};
