const service = require("../../service/service_user/service_user")
const AppError = require("../../error/AppError")

async function getUsers(req,res,next) {
    try{

        const resultado = await service.getUser()

        res.status(200).json({
            resultado
        })


    }catch(erro){
        next(erro)
    }
}

async function deleteUser(req,res,next) {
    try{
        const id = req.params.id

        if(isNaN(id)){
            throw new AppError("ID inválido")
        }

        const resultado = await service.deleteUser(id)

        res.status(200).json({
            message: "Usuario DELETADO com sucesso! ID: " + id,
            prova: "Linhas Afetadas: " + resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}

async function criarUser(req,res,next) {
    try{

        const {user, email, senha} = req.body

        const resultado = await service.criarUser(user, email, senha)

        res.status(200).json({
            message: "Usuario Criado com sucesso! novo ID: " + resultado.insertId,
            prova: "Linhas Afetadas: " + resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}

async function updateUser(req,res,next) {
    try{

        const id = req.params.id
        const {user, email, senha} = req.body

        const resultado = await service.updateUser(id, user, email, senha)

        res.status(200).json({
            message: "ID " + id + " foi Atualizado com sucesso!",
            prova: "Linhas Afetadas: " + resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}

async function loginUser(req,res,next) {
    try{
        
        const {email, senha} = req.body

        const token = await service.loginUser(email, senha)

        res.cookie("token", token, ({
            httpOnly: true,
            secure: false,        //  sem https
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24  // 1 dia 
        }))


        res.status(200).json({
            message: "Login bem sucedido!",
        })


        
    }catch(erro){
        next(erro)
    }
}


module.exports = {
    getUsers,
    deleteUser,
    criarUser,
    updateUser,
    loginUser
}