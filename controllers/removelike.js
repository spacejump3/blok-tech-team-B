const ObjectId = require('mongodb').ObjectId
exports.removeLike = async (req, res) => {
    const favoritePetId = req.body.favorite;
    console.log(favoritePetId);

    const favoritePetName = req.body.favoritename;
    console.log(favoritePetName)

    const filter = { _id: new ObjectId(favoritePetId) };

    const updateDocument = { $set: { liked: false} };

    const update = await req.app.get('database').collection('pets').updateOne(filter, updateDocument);

    res.render('liked', { favoritePetLiked: "Succesfully removed " + favoritePetName + " from favorites!" });
};