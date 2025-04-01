import { z } from "zod";

const SignInSchema = z.object({
    email: z.string()
            .email("Digite seu email!")
            .nonempty("O campo email é obrigatório"),
    password: z.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(28, "Woooow, calma calabreso! Digite uma senha menor.")
            .nonempty("É obrigatório informar uma senha")
    })

export default SignInSchema;