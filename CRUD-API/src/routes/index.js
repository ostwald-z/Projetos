const express = require("express")
const rota = express.Router()
const userRota = require("./rotas.user")

rota.get("/", function(req,res){
    res.send("Get central da API")
})


rota.use("/user", userRota)

module.exports = rota