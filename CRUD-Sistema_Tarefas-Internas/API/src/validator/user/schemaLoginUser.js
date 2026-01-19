const { z } = require("zod")


const schemaLoginUser = z.object({
    email: z.string(),
    senha: z.string()
})

module.exports = schemaLoginUser