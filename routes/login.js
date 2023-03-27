const express = require('express')
const router = express.Router()

const loginController = require('../controllers/result.js')

router.post('/', loginController.loadLogin)
// router.post('/', (req, res) => {res.send('poi')})

module.exports = router