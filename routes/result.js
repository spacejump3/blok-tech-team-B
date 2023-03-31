const express = require('express')
const router = express.Router()

const resultController = require('../controllers/result.js')

router.post('/', resultController.loadResults)
router.get('/:id/', resultController.loadSingleAnimal)

module.exports = router