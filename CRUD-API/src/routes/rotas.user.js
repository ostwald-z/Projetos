const express = require("express");
const userRota = express.Router();
const controller = require("../controllers/user.controllers")
const authMiddle = require("../middlewares/authMiddleware")
const loginSchema = require("../validators/loginschema")
const criarUserSchema = require("../validators/criarUserSchema")
const validateBody  = require("../middlewares/validarbody.Middleware")

userRota.get("/", authMiddle, controller.get)

userRota.delete("/:id", authMiddle, controller.deleteUser)

userRota.post("/", validateBody(criarUserSchema) ,controller.register)

userRota.patch("/:id", authMiddle, controller.updateUser)

userRota.post("/auth/login", validateBody(loginSchema),controller.login)

module.exports = userRota



