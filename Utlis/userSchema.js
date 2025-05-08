const joi = require("joi");

exports.userSchema = joi.object({
    username : joi.string().min(3).max(30).required(),
    firstName : joi.string().min(3).max(15).required(),
    lastName : joi.string().min(3).max(15).required(),
    password : joi.string().min(8).required(),
    role : joi.string().valid('admin','user').default('user'),
})
