const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile.js')

router.get('/', profileController.mijnProfiel)
// router.post('/submit', profileController.profielBewerken)

module.exports = router