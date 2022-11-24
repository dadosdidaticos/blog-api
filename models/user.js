const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username:{type:String,required:true},
    passwordHash:{type:String, required:true},
    firstName:{type:String, required: true},
    lastName:{type:String, required: false},
    isAdmin: {type: Boolean, required: true, default:false}
})

module.exports = mongoose.model('user',UserSchema)