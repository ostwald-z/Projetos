const AppError = require("../error/AppError")


const validatorBody = function validatorBody(schema){
    return (req,res,next) => {
        try{
            req.body = schema.parse(req.body)
            next()


        }catch(erro){
            throw new AppError("Body Inválido")
        }
    }
}

module.exports = validatorBody
