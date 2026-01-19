const { z } = require("zod");


const criarUserSchema = z.object({
    user: z.string().min(3),
    email: z.email(),
    senha: z.string().min(8)
})
module.exports = criarUserSchema