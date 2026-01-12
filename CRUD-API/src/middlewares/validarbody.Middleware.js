//Middleware de verificar o body da requisição com ZOD
const AppError = require("../errors/AppError")

function validateBody(schema){
    return (req,res, next) => {
        try{

            req.body = schema.parse(req.body)
            next()

        }catch(erro){
            throw new AppError("Body Inválido")
        }
    }
}


module.exports = validateBody