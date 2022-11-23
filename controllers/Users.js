const UserSchema = require("../models/user")
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports.userPost = [
    function (req,res,next) {
    //express-validator
    //hashing password
    //if everythin goes well, save new user
        const User = new UserSchema ({
        username:req.body.username,
        passworHash:{type:String, required:true},
        firstName:{type:String, required: true},
        lastName:{type:String, required: true},
        })
    }
]
