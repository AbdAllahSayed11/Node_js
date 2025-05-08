const express = require("express")
const Router=express.Router()
const {get,getById,Save,Update,Delete,getByIdUser} = require("../controllers/todo")
const {vefiryToken, isAdmin} = require("../middleware/auth")

Router.use(vefiryToken)

Router.get("/todos",isAdmin("user"),get)
Router.get("/todos/:id",getById)
Router.get("/todos/user/:id",getByIdUser)
Router.post("/todos",Save)
Router.delete('/todos/:id',isAdmin("admin"),Delete)
Router.patch("/todos/:id",isAdmin("admin"),Update)



module.exports=Router