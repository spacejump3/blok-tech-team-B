const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile.js')

router.get('/', profileController.profielPagina)
router.post('/submit', profileController.profielBewerken)
router.get('/logout', profileController.profielUitloggen)

module.exports = router