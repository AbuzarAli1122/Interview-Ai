const express = require('express')
const { registerUser, loginUser, logoutUser, getMe } = require('../controller/userController')
const { UserMiddleware } = require('../middleware/authProtected')

const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)

authRouter.get('/logout',logoutUser)
authRouter.get('/get-me',UserMiddleware,getMe)





module.exports = authRouter