import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, { message: 'Usuário inválido' }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;