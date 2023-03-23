const express = require('express')
const router = express.Router()

const resultController = require('../controllers/result.js')

router.post('/', resultController.loadResults)
// router.post('/', (req, res) => {res.send('poi')})

module.exports = router