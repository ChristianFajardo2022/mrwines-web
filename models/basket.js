const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema ({
    idWine: {type:mongoose.Types.ObjectId, ref:'wine'},
    idUser: {type:mongoose.Types.ObjectId, ref:'users'},
    date: {
        booking: {type:Date, required:true},
        sold: {type:Date},
        send: {type:Date}
    },
    amount: {type:Number, required:true},
    buyState: {type:String, required:true}
    //puede ser: "por comprar","comprado","archivado"
})

const Basket = mongoose.model('basket',basketSchema)
module.exports = Basket