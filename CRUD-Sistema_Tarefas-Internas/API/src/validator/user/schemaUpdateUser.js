const { z } = require("zod")

const schemaUpdateUser = z.object({

    nome: z.string(),
    email: z.email(),
    senha: z.string()

})


module.exports = schemaUpdateUser