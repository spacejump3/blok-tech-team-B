const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.js')

router.get('/', postController.postForm)

module.exports = router