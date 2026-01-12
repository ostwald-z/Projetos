

module.exports = ((erro, req, res, next) => {

    if(erro.isOperational){
        return res.status(erro.status || 400).json({
            erro: erro.message
        })
    }

    console.log("ERRO DESCONHECIDO: " + erro.message)

    res.status(500).json({
        erro: "Erro Interno."
    })

});
