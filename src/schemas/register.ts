import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome inválido' }),
    user: z.string().min(1, { message: 'Usuário inválido' }),
    password: z
      .string()
      .min(8, { message: 'Mínimo 8 dígitos' })
      .regex(/[a-z]+/, { message: 'Mínimo 1 letra minúscula' })
      .regex(/[A-Z]+/, { message: 'Mínimo 1 letra maiúscula' })
      .regex(/[@$!%*#?&]+/, { message: 'Mínimo 1 caracter especial' })
      .regex(/\d+/, { message: 'Mínimo 1 dígito' })
      .refine((value) => value.length >= 8, { message: 'Mínimo 8 dígitos' }),
    // compare with password
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
