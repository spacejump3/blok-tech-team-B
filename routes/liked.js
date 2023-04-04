const express = require('express')
const router = express.Router()

const likeController = require('../controllers/liked.js')

router.post('/', likeController.like)

module.exports = router