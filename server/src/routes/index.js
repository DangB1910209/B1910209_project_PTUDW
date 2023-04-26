const express = require('express')
const route = express.Router()

const todoRoute = require('./todoRoute')
const authRoute = require('./authRoute')

route.use('/todo', todoRoute)
route.use('/auth', authRoute)

module.exports = route