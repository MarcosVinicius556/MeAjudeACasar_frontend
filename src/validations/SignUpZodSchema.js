import { z } from "zod";

const SignUpSchema = z.object({
    name: z.string()
           .nonempty("O campo nome é obrigatório"),
    email: z.string()
            .email("Digite seu melhor email!")
            .nonempty("O campo email é obrigatório"),
    password: z.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(28, "Woooow, calma calabreso! Digite uma senha menor.")
            .nonempty("É obrigatório informar uma senha"),
    re_password: z.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(28, "Woooow, calma calabreso! Digite uma senha menor.")
            .nonempty("É obrigatório confirmar a senha"),
    }).refine((data) => data.password === data.re_password, {
        message: "As senhas não coincidem!",
        path: ["re_password"],
    });

export default SignUpSchema;