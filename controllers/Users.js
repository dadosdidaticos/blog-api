const UserSchema = require("../models/user")
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const jwt = require('jsonwebtoken')


module.exports.userPost = [
    body(['username','password','firstName','lastName'])
    .exists({checkFalsy:true})
    .withMessage('um ou mais campos estão vazios'),
    body('password')
    .isStrongPassword()
    .withMessage('Senha deve ser FORTE'),

    function (req,res,next) {
        const errors = validationResult(req)        
        if (errors.isEmpty()){            
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                const User = new UserSchema ({
                    username:req.body.username,
                    passwordHash:hash,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                });
                User.save((err,result)=>{
                    if (err) {
                        return next(err)
                    }
                    res.status(200).json(result)
                })
            })
        }else{
            console.log(req.body)
            res.status(400).json(errors.array())
        }
    }
];

module.exports.userGet = function (req,res,next) {
    UserSchema.find((err,result)=>{
        if (err){
            return next(err)
        }
        res.json(result)
    })
}
