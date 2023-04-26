const express = require('express')
const todoController = require('../controllers/todoController')
const validUser = require('../middleware/validUser')
const verifyToken = require('../middleware/verifyToken')
const route = express.Router()

// route.get('/', )

route.get('/', verifyToken, validUser, todoController.getAll)
route.post('/', verifyToken, validUser, todoController.create)
route.put('/:id', verifyToken, validUser, todoController.update)
route.delete('/:id', verifyToken, validUser, todoController.delete)

module.exports = route