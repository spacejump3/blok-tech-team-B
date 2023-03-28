const express = require('express')
const router = express.Router()

const likeController = require('../controllers/like.js')

router.get('/favorited', likeController.like)

module.exports = router