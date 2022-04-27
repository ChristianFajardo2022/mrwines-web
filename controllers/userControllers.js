const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

/* const urlFront = 'http://localhost:3000/'
const urlMrWines = 'http://localhost:4000/' */

const urlFront = 'https://mrwines.herokuapp.com/'
const urlMrWines = 'https://mrwines.herokuapp.com/'


const userControllers = {

    newAdmin: async (req,res) => {
        //console.log(req.body)
        let {userName,lastName,email,password,userPhoto,admin,from} = req.body.userData
        try {
            const hashWord = bcryptjs.hashSync(password, 10)
            const newAdmin = await new User({userName,lastName,userPhoto,email,password:[hashWord],admin,from:[from],uniqueString:crypto.randomBytes(15).toString('hex'),verification:true})
            await newAdmin.save()
            console.log(newAdmin)
            res.json({success: true,
                response: {newAdmin},
                message: "the admin has been created"})
        }
        catch (error) {
            console.log(error)
            res.json({ success: false,
                message: "sorry! we couldn't create the admin user, please try again!" })
        }
    },

    signUpUser: async (req,res) => {
        //console.log(req)
        let {userName,lastName,userPhoto,email,password,admin,from} = req.body.userData
        //const {file} = req.files
        try {
            const mrUser = await User.findOne({email})
            if (mrUser) {
                if (mrUser.from.indexOf(from) === 0) {
                    res.json({
                        success: false,
                        from: "SignUpForm",
                        message: `user ${email} already exists, please LOG IN!`})
                } else {
                    const hashWord = bcryptjs.hashSync(password, 10)
                    mrUser.from.push(from)
                    mrUser.password.push(hashWord)
                    if (from === "SignUpForm") {
                        mrUser.uniqueString = crypto.randomBytes(15).toString('hex')
                        await mrUser.save()
                        await sendEmail(email, mrUser.uniqueString)
                        res.json({
                            success: true, 
                            from: "SignUpForm", 
                            message: `check ${email}! we send you a mail to confirm your SIGN UP!`})
                    } else {
                        mrUser.save()
                        res.json({
                            success: true,
                            from:"externalSignUp", 
                            message: `user exist! LOG IN please!`})
                    }
                }
            } else {
                const hashWord = bcryptjs.hashSync(password, 10)
                const newMrUser = await new User({userName,lastName,userPhoto,email,password:[hashWord],admin,from:[from],uniqueString:crypto.randomBytes(15).toString('hex'),verification:false})
                //console.log(newMrUser)
                if (from === "SignUpForm") {
                    await newMrUser.save()
                    await sendEmail(email, newMrUser.uniqueString)
                    res.json({
                        success: true, 
                        from:"SignUpForm",
                        message: `check ${email} and finish your SIGN UP!`})
                } else {
                    await newMrUser.save()
                    res.json({
                        success: true, 
                        from:"externalSignUp",
                        message: `you SIGN UP by ${from}! now LOG IN!`})
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "sorry! try in a few minutess!!!"})
        }
    },

    logInUser: async (req, res) => {
        console.log(req.body.userLogin)
        const {email, password} = req.body.userLogin
        try {
            const mrUser = await User.findOne({email})
            if (!mrUser) {
                res.json({success: false, message: `${email} has no account in mrWines, please SIGN UP!`})
            } else {
                let from = mrUser.from
                console.log(from)
                if (from == 'SignUpForm' || from == "newAdminForm") {
                    if (mrUser.verification ) {
                        let checkedWord =  mrUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                        if (checkedWord.length > 0) {
                            const userData = {
                                id: mrUser._id,
                                userName: mrUser.userName,
                                email: mrUser.email,
                                userPhoto: mrUser.userPhoto,
                                admin: mrUser.admin,
                                from: mrUser.from};
                                console.log(userData)
                            await mrUser.save() ////agregue un await
                            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                            res.json({
                                success: true, 
                                from: from, 
                                response: {token, userData}, 
                                message: `welcome back" ${userData.userName}!`
                            })
                        } else {
                            res.json({ success: false, 
                                from: from,  
                                message: `verify your password!`})
                        }
                    } else {
                        res.json({
                            success: false, 
                            from: from, 
                            message:`check ${email}! confirm your SIGN UP and LOG IN!`}) 
                    }
                } else {
                    let checkedWord =  mrUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (checkedWord.length > 0) {
                        const userData = {
                            id: mrUser._id,
                            userName: mrUser.userName, 
                            email: mrUser.email,
                            userPhoto: mrUser.userPhoto,
                            admin: mrUser.admin,
                            from: mrUser.from}
                        await mrUser.save()
                        const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn: 1000*60*60*24 })
                        res.json({ success: true, 
                            from: from, 
                            response: {token, userData}, 
                            message: `welcome back" ${userData.userName}!`})
                    } else {
                        res.json({ success: false, 
                            from: from,  
                            message: `there is no register from ${from}, please SIGN UP`})
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "sorry! try in a few minutes!"})
        }
    },

    signOutUser: async (req, res) => {
        const email = req.body.closeData
        const user = await User.findOne({email})
        await user.save()
        res.json(console.log(email+' sign out!'))
    },

    verifyToken:(req, res) => {
        if (!req.err) {
        res.json({
            success: true,
            response: {id: req.user.id,
                userName:req.user.userName,
                email:req.user.email,
                userPhoto:req.user.userPhoto,
                admin: req.user.admin,
                from:"token"},
            message:"Hi! Welcome back "+req.user.userName}) 
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    },

    verifyEmail: async (req, res) => {
        const {uniqueString} = req.params;
        const user = await User.findOne({uniqueString: uniqueString})
        if (user) {
            user.verification = true
            await user.save()
            res.redirect(urlFront+"welcome")
        }
        else { res.json({success: false, response: `email has not been confirmed yet!`}) }
    }

}

const sendEmail = async (email, uniqueString) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "mr.wines.wines@gmail.com",
            pass: "Hola1234"
        }
    })
    let mailOptions = {
        from: 'mr.wines.wines@gmail.com',
        to: email,
        subject: "verify MyTinerary account",
        html: `
        <div>
            <h1><a href=${urlMrWines}api/verify/${uniqueString} style="color:red">CLICK!</a> to confirm you account.</h1>
            <h2>Thanks for signing up!</h2>
            <br>
            <h3>FIND YOUR PERFECT WINE</h3>
            <h3>Feel the taste of the vines</h3>
        </div>
        `};
    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) { console.log(error) }
        else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = userControllers
