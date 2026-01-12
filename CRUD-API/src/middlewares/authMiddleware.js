const jwt = require("jsonwebtoken")
const AppError = require("../errors/AppError")
//verifica se a requisição está autenticada, para ações em rotas sensiveis.

function authMiddle(req,res,next){
    try{
        const authHeader = req.headers["authorization"];
        if(!authHeader){
            throw  new AppError("Token não fornecido.", 401)
        }

        const token = authHeader.split(" ")[1];
        if (!token){
            throw new AppError("Não Autenticado!.", 401)
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next();

        
    }catch(erro){
        if(!erro.status){
            throw new AppError("Token Inválido", 401)
        }
        next(erro)
    }
}

module.exports = authMiddle