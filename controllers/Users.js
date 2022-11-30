const passport = require('passport')
const UserSchema = require("../models/user")
const {body,validationResult} = require('express-validator')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// passport.use('local',new LocalStrategy(
//     (username,password,done)=>{
        
//         User.findOne({username:username},(['username','password']),(err,user)=>{
//             if (err){
//                 done(null,false,{message:'Usuário não encontrado'})
//             }else{
//                 bcrypt.compare(password,user.passwordHash,(err,res)=>{
//                     if (res===true){
//                         console.log(user)
//                         done(null,user,{message:"Logado com sucesso",})
//                     }else{
//                         done(null,false,{message:'Senha incorreta'})
//                     }
//                 })
//             }
//         })
//     }
// ))

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
            res.status(400).json(errors.array())
        }
    }
];

module.exports.userLogin = function (req,res,next) {
    passport.authenticate('local',{session:false},(err,user,info)=>{
        
        if (err || !user){
            return res.status(401).json({message: "Auth Failed", info})
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                return res.status(401).json({err});
            }
            const opts = {}
            opts.expiresIn = 0.25*60*60;  //token expires in 15min
            const secret = process.env.JWT_KEY 
            const token = jwt.sign({user}, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        });
    })(req, res);
}

module.exports.userGet = function (req,res,next) {
    UserSchema.find((err,result)=>{
        if (err){
            return next(err)
        }
        res.json(result)
    })
}


// router.post('/login', function (req, res, next) {
//     passport.authenticate('local', {session: false}, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: 'Something is not right',
//                 user   : user
//             });
//         }
//        req.login(user, {session: false}, (err) => {
//            if (err) {
//                res.send(err);
//            }
//            // generate a signed son web token with the contents of user object and return it in the response
//            const token = jwt.sign(user, 'your_jwt_secret');
//            return res.json({user, token});
//         });
//     })(req, res);
// });