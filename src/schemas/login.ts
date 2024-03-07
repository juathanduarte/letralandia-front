import { z } from 'zod';

export const loginSchema = z.object({
  user: z.string().min(1, { message: 'Usuário inválido' }),
  password: z
    .string()
    .min(8, { message: 'Mínimo 8 dígitos' })
    .regex(/[a-z]+/, { message: 'Mínimo 1 letra minúscula' })
    .regex(/[A-Z]+/, { message: 'Mínimo 1 letra maiúscula' })
    .regex(/[@$!%*#?&]+/, { message: 'Mínimo 1 caracter especial' })
    .regex(/\d+/, { message: 'Mínimo 1 dígito' })
    .refine((value) => value.length >= 8, { message: 'Mínimo 8 dígitos' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
