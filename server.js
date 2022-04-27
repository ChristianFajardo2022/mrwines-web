require('dotenv').config()
const cors = require('cors')
const express = require('express')

require('./config/database')
const Router = require('./routes/routes')

const app = express()

const path = require('path')
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '0.0.0.0'

app.use(cors())
app.use(express.json())
app.use('/api', Router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
    app.get("*", (req,res)=> {
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

app.listen(PORT, HOST, ()=>console.log('SERVER READY ON PORT '+PORT))
//app.listen(PORT, ()=>console.log('SERVER READY ON PORT '+PORT))


/*en JSON

    "scripts": {
        "start": "nodemon server.js"
    }

*/