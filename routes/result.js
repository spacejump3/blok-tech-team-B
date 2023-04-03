const express = require('express')
const router = express.Router()

const resultController = require('../controllers/result.js')

router.post('/', resultController.loadResults)
router.post('/postcomment', resultController.createComment)

router.get('/:id/', resultController.loadSingleAnimal)

module.exports = router