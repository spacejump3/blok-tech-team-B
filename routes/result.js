const express = require('express')
const router = express.Router()

const resultController = require('../controllers/result.js')
const commentController = require('../controllers/comment.js')

router.post('/', resultController.loadResults)
router.post('/:id/comments', commentController.createComment)

router.get('/:id/', resultController.loadSingleAnimal, commentController.getComment)

module.exports = router