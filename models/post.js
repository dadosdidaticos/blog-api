const mongoose = require('mongoose')
const CommentSchema = require('./comment')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    author:{type:Schema.Types.ObjectId,ref:'user',required:true},
    comments:[{type:Schema.Types.ObjectId,ref:'comment',required:true}],
    title:{type:String, required:true},
    post:{type:String, required: true},
    published:{type:Boolean, required:true, default:false},
    postDateTime:{type:Date, default: Date.now, required:true}
})

module.exports = mongoose.model('post',PostSchema)