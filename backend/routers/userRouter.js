const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const userController = require('../controllers/userController')

router.post('/login', userController.login)

router.post('/sign-up', userController.register )


module.exports = router