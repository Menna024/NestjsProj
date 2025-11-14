import z from 'zod';

export const signUpSchema = z
  .strictObject({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine((args, ctx) => {
    if (args.password !== args.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password does not match',
      });
    }
  });
