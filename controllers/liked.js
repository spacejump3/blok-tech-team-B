const ObjectId = require('mongodb').ObjectId

exports.like = async (req, res) => {
	const favoritePetId = req.body.favorite

	const favoritePetName = req.body.petname

	const filter = { _id: new ObjectId(favoritePetId) }

	const updateDocument = { $set: { liked: true } }

	const update = await req.app.get('database').collection('pets').updateOne(filter, updateDocument)

	res.render('liked', { favoritePetLiked: `Succesfully added ${favoritePetName} to favorites!` })
};