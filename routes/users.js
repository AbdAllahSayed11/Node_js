const express = require('express');
const Router = express.Router();
const { create, Get, Delete,Update,login } = require('../controllers/users');
const {valdateUser} = require("../middleware/valdation")
const {userSchema} = require("../Utlis/userSchema")

Router.post('/users',valdateUser(userSchema), create)
Router.get('/users', Get)
Router.delete('/users/:id', Delete)
Router.patch('/users/:id',Update )
Router.post('/users/login', login)

module.exports = Router;