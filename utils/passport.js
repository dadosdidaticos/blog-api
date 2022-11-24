const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')


passport.use(new LocalStrategy(
    (username,password,done)=>{
        User.findOne({username:username},(['username','password']),(err,user)=>{
            if (err){
                done(null,false,{message:'Usuário não encontrado'})
            }else{
                bcrypt.compare(password,user.passwordHash,(err,res)=>{
                    if (res===true){
                        done(null,user,{message:"Logado com sucesso"})
                    }
                })
            }

        })
    }
))  