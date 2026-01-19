const sql = require("../../config/DB")

async function tarefaFeita(id, texto) {
    const comandosql = "UPDATE tarefas SET status = ? WHERE id = ?"
    const valores = [texto,id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado
}


async function tarefaPendente(id, texto) {
    const comandosql = "UPDATE tarefas SET status = ? WHERE id = ?"
    const valores = [texto,id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function deletarTarefa(id) {
    const comandosql = "DELETE FROM tarefas WHERE id = ?"
    const valores = [id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function criarTarefa(nome, criador) {
//nao coloco STATUS, pois ao criar a tarefa, o padrão desde criação é com que ela seja Pendente
//Depois só "clicar" em Marcar como feita
const comandosql = "INSERT INTO tarefas (nome_tarefa, criador) VALUES(?,?)"
    const valores = [nome,criador]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function mudarNome(id, nome) {
    const comandosql = "UPDATE tarefas SET nome_tarefa = ? WHERE id = ?"
    const valores = [nome, id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function listarTarefas() {
    const comandosql = "SELECT * FROM tarefas";
    const [resultado] = await sql.query(comandosql)
    return resultado;
}


async function buscarTarefa(nome) {
    const comandosql = "SELECT * FROM tarefas WHERE nome_tarefa = ?"
    const valores = [nome]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function buscarTarefaID(id){
    const comandosql = "SELECT * FROM tarefas WHERE id = ?"
    const valores = [id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


module.exports = {
    tarefaFeita,
    tarefaPendente,
    deletarTarefa,
    criarTarefa,
    mudarNome,
    listarTarefas,
    buscarTarefa,
    buscarTarefaID
}
