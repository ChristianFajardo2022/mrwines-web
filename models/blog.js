const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema ({
    userTopic: {type:mongoose.Types.ObjectId, ref:'users'},
    title: {type:String, required:true},
    text: {type:String, required:true},
    date: {type:Date},
    likes: {type:Array},
    comments: [{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref:'users'},
    }]
})

const Topic = mongoose.model('blog',topicSchema)
module.exports = Topic