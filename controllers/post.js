const xss = require('xss')
const ObjectId = require('mongodb').ObjectId
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

exports.postForm = async (req, res) => {

	if(await req.app.get('database').collection('users').findOne({ _id: new ObjectId(req.session.userid) }) == null) {
		res.redirect('/login')
		return
	}

	res.render('postform')
}

exports.submit = async (req, res) => {

	try {

		let images = []

		for(let file of req.files) {
			const filename = `${file.destination}${new Date().getTime()}${file.originalname}`
			const { filename: image } = file

			const resizedImage = await sharp(file.path)
				.resize({ width: 300, height: 300 })
				.webp()
				.toFile(filename)
			fs.unlinkSync(file.path)
			images.push(filename)
		}

		let traits = []

		req.body.trait.forEach((trait) => {
			traits.push(xss(trait))
		})

		let newPet = {
			date: new Date(),
			userid: new ObjectId(req.session.userid),
			age: xss(req.body.age),
			name: xss(req.body.name),
			species: xss(req.body.species),
			trait: traits,
			images: images,
			liked: false,
			comments: []
		}

		let result = await req.app.get('database').collection('pets').insertOne(newPet)

		if(req.headers.accept.includes('application/json')) {
			res.send({
				success: true,
				id: result.insertedId
			})
		} else {
			res.redirect(`/advertentie/${result.insertedId}`)
		}

	} catch (err) {
		console.log(err.stack)
	}
}