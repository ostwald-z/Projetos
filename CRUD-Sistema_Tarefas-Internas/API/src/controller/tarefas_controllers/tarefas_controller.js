const service = require("../../service/service_tarefas/service_tarefas")

async function listarTarefas(req, res, next) {
    try{

        const resultado = await service.listarTarefas()
        res.status(200).json({
            resultado
        })

    }catch(erro){
        next(erro)
    }
}

async function deletarTarefa(req,res,next) {
    try{

        const id = req.params.id
        const resultado = await service.deletarTarefa(id)

        res.status(200).json({
            message: "ID: " + id + " Deletado com sucesso",
            prova: resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}

async function criarTarefa(req,res,next) {
    try{

        const criador = req.user.user

        const {nome} = req.body

        const resultado = await service.criarTarefa(nome, criador)

        res.status(200).json({
            message: "Tarefa criada com sucesso!",
            prova: "Novo ID da tarefa: " + resultado.insertId
        })


    }catch(erro){
        next (erro)
    }
}

async function marcarTarefaComo(req,res,next) {
    try{

        const id = req.params.id
        const {status} = req.body
        const role  = req.user.role

        const resultado = await service.marcarTarefaComo(id, status, role)
        
        res.status(200).json({
            message: "Tarefa marcada com Sucesso!",
            prova: resultado.affectedRows
        })

    }catch(erro){
        next(erro)
    }
}

async function mudarNomeTarefa(req,res,next) {
    try{

        const id = req.params.id
        const criador = req.user.user
        const {texto} = req.body


        const resultado = await service.mudarNomeTarefa(id, criador, texto)

        res.status(200).json({
            message: "Nome atualizado com sucesso.",
            prova: resultado.affectedRows
        })



    }catch(erro){
        next(erro)
    }
}


module.exports = {
    listarTarefas,
    deletarTarefa,
    criarTarefa,
    marcarTarefaComo,
    mudarNomeTarefa
}