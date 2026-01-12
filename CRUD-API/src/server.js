require("dotenv").config();
require("./config/database")
const express = require("express");
const server = express();
const rota = require("./routes/index");
const erroMiddleware = require("./middlewares/erro.middleware");



server.listen(process.env.PORT, () => {
    console.log("Server: ON")
})

server.use(express.json())

server.get("/", function(req,res){
    res.send("Get principal do server.")
})

server.use("/api", rota)



server.use(erroMiddleware)

