const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
require('dotenv').config()


passport.use(new LocalStrategy(
    (username,password,done)=>{
        User.findOne({username:username},(['username','passwordHash']),(err,user)=>{
            if (!user){
                return done(null,false,{message:'Usuário não encontrado'})
            }else{
                bcrypt.compare(password,user.passwordHash,(err,res)=>{
                    if (res){
                        return done(null,user)
                    }
                    return done(null,false,{message:'Senha incorreta'})
                })
            }

        })
    }
))