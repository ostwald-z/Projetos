const {z} = require("zod")

const schemaUpdateTarefa = z.object({
    status: z.string()
})


module.exports = schemaUpdateTarefa