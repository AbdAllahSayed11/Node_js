const Users = require('../models/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {catchAsync} = require('../Utlis/catchAsync');

const create = catchAsync( async (req, res,next) => {
    const user = req.body;

    salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password,salt);
    const user_data = await Users.create(user);
    res.status(201).send({
        status : "success",
        data : user_data
    })

})



const login = catchAsync( async (req, res,next) => {
    const user = req.body;
    if(!user.username || !user.password){
        return res.status(400).send({
            status : "failed",
            message : "email and password are required"
        })
    }

        const user_data = await Users.findOne({username : user.username});
        if(!user_data){
            return res.status(404).send({
                status : "failed",
                message : "user not found"
            })
        }
        const isMatch = await bycrypt.compare(user.password, user_data.password);
        if(!isMatch){
            return res.status(401).send({
                status : "failed",
                message : "invalid password"
            })
        }
        
        const token = jwt.sign({ id: user_data._id,role:user_data.role }, process.env.SECRECT, { expiresIn: '1h' });
        res.status(200).send({
            status : "success",
            token : token,
        })
})



const Get =  catchAsync (async (req, res,next) => {
    const user = req.body;
        const user_data = await Users.find({}).select('firstName');
        res.status(201).send({
            status : "success",
            data : user_data
        })
})

const Delete = catchAsync( async (req, res,next) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).send({
            status : "failed",
            message : "username is required"
        })}
        
        
        const user_data = await Users.findByIdAndDelete(id)
        res.status(201).send({
            status : "success",
            data : user_data
        })

})

const Update =  catchAsync ( async (req, res,next) => {
    const id = req.params.id;
    const data = req.body;
    if(!id){
        return res.status(400).send({
            status : "failed",
            message : "username is required"
        })}
        
        const user_data = await Users.findByIdAndUpdate(id,data,{ runValidators: true})
        res.status(201).send({
            status : "success",
            data : user_data
        })

})



module.exports = {
    create,
    Get,
    Delete,
    Update,
    login
}