const Topic = require('../models/blog')

const topicControllers = {

    getTopics: async (req,res) => {
        let topics
        let error = null
        try {
            topics = await Topic.find()
                .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
        } catch (err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : {topics},
            success: error ? false:true,
            error: error
        })
    },

    getOneTopic: async (req,res) => {
        let topic
        let id = req.params.id 
        let error = null
        try {
            topic = await Topic.find({_id:id})
                .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
        } catch (err) {
            error = err
            console.log(error)
        }
        res.json({
            response: error ? 'ERROR' : {topic},
            success: error ? false:true,
            error: error
        })
    },

    uploadTopic: async (req,res) => {
        console.log(req.body)
        const {title, text} = req.body
        const userTopic = req.user._id
        try {
            const newTopic = await new Topic ({userTopic: userTopic, title, text, date: Date.now()}).save()
            res.json({success: true,
                response: {newTopic},
                message: "the topic has been uploaded"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "sorry! we couldn't upload the topic, please try again!" })
        }
    },

    deleteTopic: async (req,res) => {
        const id = req.params.id
        try{
            await Topic.findOneAndDelete({_id:id},{new:true})
            res.json({success: true,
                message: "the topic has been deleted"})
        }catch (e){
            error = e
            res.json({ success: false, response: error})
        }
        
    },

    modifyTopic: async (req,res) => {
        //console.log(req.body)
        const {title, text, id} = req.body
        const user = req.user._id
            try {
                const modifyTopic = await Topic
                    .findOneAndUpdate({"_id": id}, {$set:{
                        "title": title,
                        "text": text,}}, {new: true})
                    .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                    .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
                res.json({success: true,
                    response: {modifyTopic},
                    message: "the topic has been modified"})   
                    console.log(modifyTopic)
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "sorry! we could'nt modify the topic, please try again!" })
        }
    },

    likeTopic: async (req,res) => {
        console.log(req.params.id)
        let id = req.params.id 
        let user = req.user.id
        try { 
            let topics = await Topic.findOne({_id:id}) 
            if (topics.likes.includes(user)) {
                Topic.findOneAndUpdate({_id:id}, {$pull:{likes:user}}, {new:true})
                    .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                    .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
                    .then(response => res.json({
                        response: response.likes, 
                        success: true
                    }))
                    .catch(error => console.log(error))
            } else {
                Topic.findOneAndUpdate({_id:id}, {$push:{likes:user}}, {new:true})
                    .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                    .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
                    .then(response => res.json({
                        response: response.likes, 
                        success: true
                    }))
                    .catch(error => console.log(error))
            }
        } catch (error) {
            res.json({
                response: error,
                success: false
            })
        } 
    },

    addComment: async (req, res) => {
        //console.log('REQ BODY REQ BODY REQ BODY REQ BODY')
        //console.log(req.body)
        const {topicId,comment} = req.body
        //console.log(topicId)
        const user = req.user._id
        try {
            const newComment = await Topic
                    .findOneAndUpdate({_id: topicId}, {$push: {comments: {comment: comment, userId: user}}}, {new: true})
                    .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                    .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
                res.json({success: true,
                    response: {newComment},
                    message: "thanks for comment!"})
        }
        catch (error) {
            console.log(error)
            res.json({success: false,
            message: "try again please!"})
        }
    },

    modifyComment: async (req, res) => {
        const {commentId,comment} = req.body
        const user = req.user._id
        try {
            const modifyComment = await Topic
                .findOneAndUpdate({"comments._id": commentId}, {$set: {"comments.$.comment": comment}}, {new: true})
                .populate("userTopic", {_id:1,email:1,userName:1,userPhoto:1})
                .populate("comments.userId", {_id:1,email:1,userName:1,userPhoto:1})
            res.json({success: true,
                response: {modifyComment},
                message: "the comment has been modified"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: true,
                message: "sorry! try again!" })
        }
    },

    deleteComment: async (req, res) => {
        console.log(req.params.id)
        const commentId = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await Topic
                .findOneAndUpdate({"comments._id": commentId}, {$pull: {comments: {_id: commentId}}}, {new: true})
            res.json({success: true,
                response: {deleteComment},
                message: "the comment has been deleted"})
        }
        catch (error) {
            console.log(error)
            res.json({success: false,
                message: "try again!"})
        }
    }
}

module.exports = topicControllers