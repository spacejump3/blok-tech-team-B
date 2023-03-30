const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile.js')

router.get('/', profileController.profielPagina)

module.exports = router