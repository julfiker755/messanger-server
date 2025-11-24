import { z } from 'zod';
import { userRole } from './user.constants';

const userSchema = z.object({
  email: z.string({
    invalid_type_error: 'email must be string',
    required_error: 'email is Required',
  }),
  password: z.string({
    invalid_type_error: 'password must be string',
    required_error: 'password is Required',
  }),
  role:z.enum(userRole,{
    invalid_type_error: 'role must be string',
    required_error: 'role is Required',
  }),
});


export const userValidation = {
  userSchema,
};
