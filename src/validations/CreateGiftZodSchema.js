import { z } from "zod";

const CreateGiftSchema = z.object({
    name: z.string()
           .nonempty("O campo de nome é obrigatório"),
    description: z.string()
           .nonempty("O campo de descrição é obrigatório"),
    average_values: z.string()
                     .nonempty("O campo de média de valores é obrigatório"),
    url_img: z.string().url("Informe um link válido"),
    wanted_by: z.string().optional(),
    bought_by: z.string().optional(),
    status: z.enum(["DISPONIVEL", "OBSERVADO", "COMPRADO"], "Selecione um status")
})

export default CreateGiftSchema;