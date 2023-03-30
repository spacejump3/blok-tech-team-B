const express = require('express')
const router = express.Router()

const registrerenController = require('../controllers/register.js')

router.get('/', registrerenController.registrerenPagina)
router.post('/submit', registrerenController.accountAanmaken)

module.exports = router