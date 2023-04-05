const xss = require('xss')
const ObjectId = require('mongodb').ObjectId

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

		req.files.forEach((file) => {
			images.push(file.path)
		})

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