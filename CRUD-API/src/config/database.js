const mysql = require("mysql2/promise")

const conexao = mysql.createPool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORTA,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

async function tentaConectar() {
    try{

        const conectar = await conexao.getConnection()
        console.log("DB: ON")
        conectar.release()

    }catch(erro){
        console.log("Erro no banco: " + erro);
        process.exit(1);
    }
}


tentaConectar()

module.exports = conexao;