const sql = require("../config/database")


async function ListarUsers() {
    const [resultado] = await sql.query("SELECT * FROM usuarios");
    return resultado;

}

async function DeletarUser(id) {
    const comandosql = "DELETE FROM usuarios WHERE id = ?";
    const [resultado] = await sql.query(comandosql, id)
    return resultado;
}

async function criarUser(user, email, senha) {
    const comandosql = "INSERT INTO usuarios (user, email, senha_hash) VALUES (?, ?, ?)"
    const valores = [user, email, senha];
    const [resultado] = await sql.query(comandosql, valores);
    return resultado;
}


async function buscarEmail(email) {
    const comandosql = "SELECT * FROM usuarios WHERE email = ?"
    const [resultado] = await sql.query(comandosql, email);
    const resultadof = resultado;
    return resultadof[0];
}

async function buscarUser(user) {
    const comandosql = "SELECT * FROM usuarios WHERE user = ?";
    const [resultado] = await sql.query(comandosql, user)
    const resultadof = resultado;
    return resultadof[0];
}

async function updateUser(campos, valores) {
    const comandosql = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = ?`
    const [resultado] = await sql.query(comandosql, valores)
    return resultado;
}

async function login(email) {
    const comandosql = "SELECT * FROM usuarios WHERE email = ?"
    const [resultado] = await  sql.query(comandosql, email)
    const usuario = resultado
    return usuario[0];
}





module.exports = {
    ListarUsers,
     DeletarUser,
     criarUser,
     buscarEmail,
     buscarUser,
     updateUser,
     login}