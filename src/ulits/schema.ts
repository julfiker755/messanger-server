import { z } from 'zod';

export const user_sc = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .nonempty('Name cannot be empty'),

  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),

  avater: z.string().optional(),
});
