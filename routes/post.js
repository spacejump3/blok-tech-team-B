const express = require('express')
const router = express.Router()

const multer = require('multer')
const sharp = require('sharp')

const storage = multer.diskStorage({
	destination: (req, file, callback) => {

		callback(null, 'static/upload/')
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname)
	}
})

const upload = multer({
	storage: storage
})

const postController = require('../controllers/post.js')

router.get('/', postController.postForm)

router.post('/submit', upload.array('images'), postController.submit)

module.exports = router