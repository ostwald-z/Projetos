require("dotenv").config()
require("./config/DB")
const express = require("express")
const server = express()
const rotaIndex = require("./router/index")
const erroMiddle = require("../src/middleware/erro.middle")
const cookieParser = require("cookie-parser")

server.listen(process.env.PORT, function(){
    console.log("Server: ON")
})

server.use(express.json())

server.use(cookieParser())

server.use("/api", rotaIndex)



server.use(erroMiddle)