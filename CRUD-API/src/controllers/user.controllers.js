const AppError = require("../errors/AppError")
const service = require("../services/service.user")


async function get(req,res, next) {
    try{

        const usuarios = await service.listarUser()
        
        res.status(200).json({
            usuarios
        })

    }catch(erro){
        next(erro)
    }
}


async function deleteUser(req,res,next) {
    try{
        const id = req.params.id;

        const resultado = await service.deleteUser(id)

        res.status(200).json({
            message: "Usuario Deletado! ID: " + id,
            prova: resultado.affectedRows
        })


    }catch(erro){
        next(erro)
    }
}


async function register(req,res,next) {
    try{
        if(!req.body){
            throw new AppError("Dados insuficientes para criar um usuario.")
        }

        const {user, email, senha} = req.body || {}
        const resultado = await service.criarUser(user, email, senha)

        res.status(200).json({
            message: "Usuario criado com sucesso!",
            prova: "Novo ID: " + resultado.insertId
        })



    }catch(erro){
        next(erro)
    }

}


async function updateUser(req, res, next) {
    try{

        const id = req.params.id

        if(!req.body){
            throw new AppError("Sem campo válido para atualização")
        }

        const {user, email, senha} = req.body || {}

        const resultado = await service.updateUser(id, user, email, senha)

        res.status(200).json({
            message: "ID " + id + " atualizado com sucesso",
            prova: resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}


async function login(req, res, next) {
    try{

        if(!req.body){
            throw new AppError("Campos insuficientes para Login")
        }

        const {email, senha} = req.body

        const token = await service.login(email, senha)

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token
        })
        

    }catch(erro){
        next(erro)
    }
}


module.exports = {
    get,
    deleteUser,
    register,
    updateUser,
    login
}