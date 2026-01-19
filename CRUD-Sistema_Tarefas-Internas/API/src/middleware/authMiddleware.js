const jwt = require("jsonwebtoken")
const AppError = require("../error/AppError")

function authMiddle(req,res,next){
    try{
        const token = req.cookies.token

        if(!token){
            throw new AppError("Não Autenticado", 401)
        }


        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();

    }catch(erro){
        if(!erro.status){
            throw new AppError("Não Autenticado")
        }
        next(erro)
    }
}



module.exports = authMiddle