const express = require('express')
const router = express.Router()

const loginController = require('../controllers/login.js')

router.get('/', loginController.inlogPagina)
router.post('/submit', loginController.inloggen)
router.get('/failed', loginController.inloggenMislukt)

module.exports = router