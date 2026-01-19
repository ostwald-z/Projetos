const mysql = require("mysql2/promise")

const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_SENHA,
    database: process.env.DB_DATABASE
})

async function testarConexao() {
    try{
        const conectar = await conexao.getConnection();
        console.log("DB: ON");
        conectar.release();

    }catch(erro){
        console.log("Erro no banco: " + erro.message);
        process.exit(1)
    }

}

testarConexao()

module.exports = conexao;