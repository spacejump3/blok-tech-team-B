const ObjectId = require('mongodb').ObjectId
exports.removeLike = async (req, res) => {
	const favoritePetId = req.body.favorite

	const favoritePetName = req.body.favoritename

	const filter = { _id: new ObjectId(favoritePetId) }

	const updateDocument = { $set: { liked: false} }

	const update = await req.app.get('database').collection('pets').updateOne(filter, updateDocument)

	res.render('liked', { favoritePetLiked: `Succesfully removed ${favoritePetName} from favorites!` })
}