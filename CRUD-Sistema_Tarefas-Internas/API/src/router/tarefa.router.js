const express = require("express")
const rotaTarefa = express.Router()
const controller = require("../controller/tarefas_controllers/tarefas_controller")
const authMiddle = require("../middleware/authMiddleware")
const roleMiddle = require("../middleware/role.middleware")
const validatorBody = require("../middleware/validatorBody")
const schemaUpdateTarefa = require("../validator/tarefas/schemaUpdateTarefa")
const schemaCriarTarefa = require("../validator/tarefas/schemaCriarTarefa")
const schemaUpdateNome = require("../validator/tarefas/schemaUpdateNome")

rotaTarefa.get("/", authMiddle, roleMiddle(["admin", "user"]),controller.listarTarefas)

rotaTarefa.delete("/:id", authMiddle, roleMiddle("admin"),controller.deletarTarefa)

rotaTarefa.post("/", authMiddle, roleMiddle("admin"), validatorBody(schemaCriarTarefa),controller.criarTarefa)

rotaTarefa.patch("/marcar-task/:id", authMiddle, roleMiddle(["admin", "user"]), validatorBody(schemaUpdateTarefa),controller.marcarTarefaComo)

rotaTarefa.patch("/update-nome/:id", authMiddle, roleMiddle("admin"), validatorBody(schemaUpdateNome), controller.mudarNomeTarefa)

module.exports = rotaTarefa