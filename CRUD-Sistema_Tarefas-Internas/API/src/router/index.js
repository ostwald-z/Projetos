const express = require("express")
const router = express.Router()
const rotaUser = require("./user.router")
const rotaTarefa  = require("./tarefa.router")

router.use("/user", rotaUser)
router.use("/tarefas", rotaTarefa)



router.get("/", function(req,res){
    res.send("Get principal da API, nada por aqui")
})



module.exports = router