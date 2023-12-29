const express = require("express")
const userRoutes = express.Router()
const userController = require("../controller/userController.js")
const authenticationMiddlewares = require('../controller/authenticationMiddlewares.js')

userRoutes.get('/', authenticationMiddlewares.userAuthentication, userController.userLogin)

userRoutes.post('/signup', authenticationMiddlewares.existingUser, userController.userSignup)

userRoutes.get('/home', authenticationMiddlewares.userAuthentication, userController.userHome)

userRoutes.post('/logout', userController.userLogout)

userRoutes.post('/login', authenticationMiddlewares.userVerification, userController.userLogin)



module.exports = userRoutes
