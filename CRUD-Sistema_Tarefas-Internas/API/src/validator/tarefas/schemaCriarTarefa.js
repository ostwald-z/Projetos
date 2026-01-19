const {z} = require("zod")


const schemaCriarTarefa = z.object({
    nome: z.string(),
})

module.exports = schemaCriarTarefa