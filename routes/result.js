const express = require('express')
const router = express.Router()


const resultController = require('../controllers/result.js')

router.post('/', resultController.loadResults)
// router.post('/', (req, res) => {res.send('poi')})

router.get('/:id/', resultController.loadSingleAnimal)

module.exports = router