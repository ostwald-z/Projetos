const { z } = require("zod")

const schemaUpdateNome = z.object({

    texto: z.string()

})


module.exports = schemaUpdateNome