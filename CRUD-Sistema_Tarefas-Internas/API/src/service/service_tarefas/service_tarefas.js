const AppError = require("../../error/AppError")
const repoTarefas = require("../../repo/repo_tarefas/repo_tarefas")
const repoUser = require("../../repo/repo_user/repo.user")

async function listarTarefas() {
    const resultado = await repoTarefas.listarTarefas()
    if(resultado.length === 0){
        throw new AppError("Nenhuma tarefa a ser listada.", 404)
    }
    return resultado;
}

async function marcarTarefaComo(id, status, roles) {
    
    if(isNaN(id)){
        throw new AppError("ID inválido")
    }

    //não preciso validar ROLES, pois ele é dado no token, e pego pelo controller
    // ele sempre vai ser válido e correto


    if (typeof status === "string" && status.trim() === "1"){
        
        if(roles === "admin"){
            const resultado = await repoTarefas.tarefaFeita(id, "Feito")

            if(resultado.affectedRows === 0){
                throw new AppError("ID da tarefa não encontrado")
            }

            return resultado;
        }

        const resultado = await repoTarefas.tarefaFeita(id, "Marcado Feito")

        if(resultado.affectedRows === 0){
            throw new AppError("ID da tarefa não encontrado")
        }

        return resultado;
    }


    if(typeof status === "string" && status.trim() === "0"){

        if(roles === "admin"){

            const resultado = await repoTarefas.tarefaPendente(id, "Pendente")

            if(resultado.affectedRows === 0){
                throw new AppError("ID da tarefa não encontrado")
            }
            return resultado;
        }

        const resultado = await repoTarefas.tarefaPendente(id, "Marcado Pendente")

        if(resultado.affectedRows === 0){
            throw new AppError("ID da tarefa não encontrado")
        }
        
        return resultado;
    }


    throw new AppError("status inválido")
}

async function deletarTarefa(id) {
    if(isNaN(id)){
        throw new AppError("ID Inválido")
    }
    const resultado = await repoTarefas.deletarTarefa(id)
    if(resultado.affectedRows === 0){
        throw new AppError("ID não encontrado")
    }
    return resultado
}

async function criarTarefa(nome, criador) {

if (typeof nome !== "string" || nome.trim().length === 0){
    throw new AppError("Nome da Tarefa Inválido")
}

if (typeof criador !== "string" || criador.trim().length === 0){
    throw new AppError("Criador inválido");
}

//padroniza e limpa variaveis
const nomeLimpo = nome.trim()
const criadorLimpo = criador.trim()

//verificar se Criador da tarefa realmente existe no banco
//verificar se ja existe uma tarefa com o mesmo  nome
const [criadorVerificar] = await repoUser.buscarUser(criadorLimpo)
const [nomeVerificar] = await repoTarefas.buscarTarefa(nomeLimpo)

if(!criadorVerificar){
    throw new AppError ("Criador sem permissão para criar Tarefas", 401)
}

if(nomeVerificar){
    throw new AppError("Tarefa já existente com o mesmo nome", 409)
}


const resultado = await repoTarefas.criarTarefa(nomeLimpo, criadorLimpo)
return resultado;

}


async function mudarNomeTarefa(id, criador, texto) {

    if(isNaN(id)){
        throw new AppError("ID inválido.")
    }

    //VERIFICO se o nome do usuario da requisição É IGUAL ao criador da tarefa
    //para ver se pode ou não alterar o nome da mesma.

    const [tarefa] = await repoTarefas.buscarTarefaID(id)
    

    if(!tarefa){
        throw new AppError("ID não encontrado.", 404)
    }

    if(criador !== tarefa.criador){
        throw new AppError("Somente o criador da Tarefa pode renomea-la", 403)
    }

    if(typeof texto !== "string" || texto.trim().length === 0){
        throw new AppError("Novo nome Inválido")
    }


    //verifico se já existe uma tarefa com o mesmo nome
    const [nomeVerificar] = await repoTarefas.buscarTarefa(texto)
    if(nomeVerificar){
        throw new AppError("Já existem tarefas com este mesmo nome.", 409)
    }


    const resultado = await repoTarefas.mudarNome(id, texto)

    if(resultado.affectedRows === 0){
        throw new AppError("ID não encontrado.", 404)
    }

    return resultado;
}


module.exports = {
    marcarTarefaComo,
    listarTarefas,
    deletarTarefa,
    criarTarefa,
    mudarNomeTarefa
}