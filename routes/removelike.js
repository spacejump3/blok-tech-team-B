const express = require('express')
const router = express.Router()

const likeController = require('../controllers/removelike.js')

router.post('/', likeController.removeLike)

module.exports = router