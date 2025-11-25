import { z } from 'zod';


//  ==============  user sc ==============
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


//  =============== chat sc ============
export const chatSchema = z.object({
  participantId: z.string().trim().min(1).optional(),
  isGroup: z.boolean().optional(),
  participants: z
    .array(z.string().trim().min(1))
    .optional(),
  groupName: z.string().trim().min(1).optional(),
});

//  ============== chatIdSchema  ===============
export const chatIdSchema = z.object({
  id: z.string().trim().min(1),
});
