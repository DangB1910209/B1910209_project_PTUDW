const express = require('express')
const authController = require('../controllers/authController')
const route = express.Router()


route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/logout', authController.logout)

module.exports = route