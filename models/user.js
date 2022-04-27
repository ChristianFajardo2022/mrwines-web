const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    userName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:Array, required:true},
    userPhoto: {type:String, required:true},
    admin: {type:Boolean, required:true},
    country: {type:String},
    city: {type:String},
    adress: {type:String},
    ship: {type:Array},
    from: {type:Array},
    uniqueString: {type:String, required:true},
    verification: {type:Boolean, required:true}
})

const User = mongoose.model('users',userSchema)
module.exports = User