const mongoose = require('mongoose')

const wineSchema = new mongoose.Schema ({
    nameWine: {type:String, required:true},
    type: {type:String, required:true},
    variety: {type:String, required:true},
    country: {type:String, required:true},
    harvest: {type:Number, required:true},
    smell: {type:String, required:true},
    palate: {type:String, required:true},
    food:  {type:String, required:true},
    color: {type:String, required:true},
    photo: {type:String, required:true},
    stock: {
        stock: [{
            amount: {type:String},
            adminId: {type:mongoose.Types.ObjectId, ref:'user'}
        }],
        shipping: [{
            amount: {type:String},
            userId: {type:mongoose.Types.ObjectId, ref:'user'}
        }]
    },
    stars: {type:Array, required:true},
    price: {type:Number, required:true}
})

const Wine = mongoose.model('wine',wineSchema)
module.exports = Wine