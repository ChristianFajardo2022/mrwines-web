const Router = require('express').Router()
const validator = require('../config/validator')
const passport = require('../config/passport')


const {newAdmin,signUpUser,logInUser,signOutUser,verifyEmail,verifyToken} = require('../controllers/userControllers')

Router.route('/auth/newAdmin')
    .post(validator,newAdmin)
Router.route('/auth/signUp')
    .post(validator,signUpUser)
Router.route('/auth/logIn')
    .post(logInUser)
Router.route('/auth/signOut')
    .post(signOutUser)
Router.route('/verify/:uniqueString')
    .get(verifyEmail)
Router.route('/auth/loginToken')
    .get(passport.authenticate('jwt', {session:false}), verifyToken)


const {getWines,getTypeWines,oneWine,uploadWine,deleteWine,modifyInfoWine,modifyStockWine} = require('../controllers/wineControllers')

Router.route('/wines')
    .get(getWines)
    .post(uploadWine)
Router.route('/types/:id')
    .get(getTypeWines)
Router.route('/wines/:id')
    .delete(deleteWine)
    .put(modifyInfoWine)
    .get(oneWine)
Router.route('/stock/:id')
    .put(modifyStockWine)


const {addProduct,modifyProduct,deleteProduct,getUserBasket,getBuy,getOld,getProduct,modifyState} = require('../controllers/basketControlers')

Router.route('/basket')
    .get(passport.authenticate('jwt', {session: false}), getUserBasket)
    .post(passport.authenticate('jwt', {session: false}), addProduct)
    .put(passport.authenticate('jwt', {session: false}), modifyProduct)
Router.route("/basket/:id")
    .get(passport.authenticate('jwt', {session: false}), getProduct)
    .delete(passport.authenticate('jwt', {session: false}), deleteProduct)
Router.route('/buyBasket')
    .get(passport.authenticate('jwt', {session: false}), getBuy)    
    .put(passport.authenticate('jwt', {session: false}), modifyState)
Router.route('/oldBasket')
    .get(passport.authenticate('jwt', {session: false}), getOld)



const {getTopics,getOneTopic,uploadTopic,deleteTopic,modifyTopic,likeTopic,addComment,modifyComment,deleteComment} = require('../controllers/topicControllers')

Router.route('/topics')
    .get(getTopics)
    .put(passport.authenticate('jwt', {session:false}), modifyTopic)
    .post(passport.authenticate('jwt', {session:false}), uploadTopic)
Router.route('/topics/:id')
    .get(getOneTopic)
    .post(passport.authenticate('jwt', {session: false}), deleteTopic)
Router.route('/topics/likes/:id')
    .put(passport.authenticate('jwt', {session:false}), likeTopic)
Router.route('/comments')
    .post(passport.authenticate('jwt', {session: false}), addComment)
    .put(passport.authenticate('jwt', {session: false}), modifyComment)
Router.route('/comments/:id')
    .post(passport.authenticate('jwt', {session: false}), deleteComment) 

module.exports = Router