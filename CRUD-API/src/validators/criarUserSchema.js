const { z } = require("zod");


const criarUserSchema = z.object({
    user: z.string(),
    email: z.string().email(),
    senha: z.string().min(8)
})
module.exports = criarUserSchema