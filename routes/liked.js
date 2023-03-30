const express = require('express')
const router = express.Router()

const likeController = require('../controllers/liked.js')

router.post('/', likeController.like)
console.log(likeController)

module.exports = router