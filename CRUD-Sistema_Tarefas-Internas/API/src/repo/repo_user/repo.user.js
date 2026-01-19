const sql = require("../../config/DB")


async function getUser() {
    const comandosql = "SELECT * FROM usuarios"
    const [resultado] = await sql.query(comandosql)
    return resultado;
}


async function deleteUser(id) {
    const comandosql = "DELETE FROM usuarios WHERE id = ?"
    const valores = [id]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function criarUser(user, email, senha) {
    const comandosql = "INSERT INTO usuarios (user, email, senha_hash) VALUES (?,?,?)"
    const valores = [user, email, senha]
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function updateUser(campos, valores) {
    const comandosql = "UPDATE usuarios SET " + campos.join(", ") + "WHERE id = ?"
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}


async function buscarUser(user) {
    const comandosql = "SELECT * FROM usuarios WHERE user = ?"
    const valores = [user]
    const resultado = await sql.query(comandosql, valores)
    return resultado[0];
}

async function buscarEmail(email) {
    const comandosql = "SELECT * FROM usuarios WHERE email = ?"
    const valores = [email]
    const resultado = await sql.query(comandosql, valores)
    return resultado[0];
}


module.exports = {
    getUser,
    deleteUser,
    criarUser,
    updateUser,
    buscarUser,
    buscarEmail
}