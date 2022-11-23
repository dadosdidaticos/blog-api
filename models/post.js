const mongoose = require('mongoose')
const CommentSchema = require('./comment')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    author:{type:Schema.Types.ObjectId,ref:'user',required:true},
    comments:[CommentSchema],
    title:{type:String, required:true},
    post:{type:String, required: true},
})

module.exports = mongoose.model('post',PostSchema)