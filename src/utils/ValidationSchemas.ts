import { z } from 'zod';

/**
 * Schema para o form de Login
 */
export const LoginFormSchema = z.object({
    username: z.string()
               .min(1, "Informe o nome de usuário.")
               .max(32, "O nome de usuário não deve ser maior que 32 caractéres."),
    password: z.string()
               .min(1, "Informe a senha.")
               .max(512, "A senha não deve ser maior que 512 caractéres."),
});

/**
 * Schema para o form de Registro
 */
export const RegisterFormSchema = z.object({
    username: z.string()
               .min(1, "Informe o nome de usuário.")
               .max(32, "O nome de usuário não deve ser maior que 32 caractéres."),
    nickname: z.string()
               .min(1, "Informe o seu apelido.")
               .max(64, "O apelido não deve ser maior que 64 caractéres."),
    password: z.string()
               .min(1, "Informe a senha.")
               .max(512, "A senha não deve ser maior que 512 caractéres."),
    re_password: z.string()
               .min(1, "Confirme a sua senha.")
               .max(512, "A senha não deve ser maior que 512 caractéres."),
});

