const express = require('express')
const router = express.Router()

const multer = require('multer')
const fs = require('fs')
const ObjectId = require('mongodb').ObjectId

const storage = multer.diskStorage({
	destination: (req, file, callback) => {

		let id = new ObjectId()

		console.log(id.to)

		if(!fs.existsSync(`static/upload/${id}`)) {
			fs.mkdirSync(`static/upload/${id}`, { recursive: true });
		}

		callback(null, `static/upload/${id}`)
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