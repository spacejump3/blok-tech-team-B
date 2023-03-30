const express = require('express')
const router = express.Router()

const loginController = require('../controllers/login.js')

router.get('/', loginController.inlogPagina)
router.post('/submit', loginController.inloggen)

module.exports = router