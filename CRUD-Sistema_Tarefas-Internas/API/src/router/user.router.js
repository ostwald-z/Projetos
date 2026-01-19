const express = require("express")
const rotaUser = express.Router()
const controller  = require("../controller/user_controllers/controller_user")
const authMiddle = require("../middleware/authMiddleware")
const validarBody = require("../middleware/validatorBody")
const schemaCriarUser = require("../validator/user/schemaCriarUser")
const schemaUpdateUser = require("../validator/user/schemaUpdateUser")
const schemaLoginUser = require("../validator/user/schemaLoginUser")

// rota completa AQUI: url/porta/api/user/


//controller de listar
rotaUser.get("/", authMiddle ,controller.getUsers)


//delete
rotaUser.delete("/:id", authMiddle ,controller.deleteUser)


//criar
rotaUser.post("/", validarBody(schemaCriarUser) ,controller.criarUser)


//update (patch)
rotaUser.patch("/:id", authMiddle, validarBody(schemaUpdateUser) ,controller.updateUser)


//Login
rotaUser.post("/login", validarBody(schemaLoginUser) ,controller.loginUser)



module.exports = rotaUser