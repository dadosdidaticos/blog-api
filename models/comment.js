const mongoose = require('mongoose')
const DateTime = {DateTime}
const Schema = mongoose.Schema
const CommentSchema = new Schema({
    author:{type:Schema.Types.ObjectId,ref:'user',required:true},
    post:{type:Schema.Types.ObjectId,ref:'post',required:true},
    text:{type:String, required: true},
    commentDateTime:{type:Date, default: Date.now, required:true},
})

module.exports = mongoose.model('comment',CommentSchema)