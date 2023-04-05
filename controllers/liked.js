const ObjectId = require('mongodb').ObjectId

exports.like = async (req, res) => {
    const favoritePetId = req.body.favorite;
    console.log(favoritePetId);

    const favoritePetName = req.body.petname
    console.log(favoritePetName)

    const filter = { _id: new ObjectId(favoritePetId)};

    const updateDocument = { $set: { liked: true} };

    const update = await req.app.get('database').collection('pets').updateOne(filter, updateDocument);

    res.render('liked', { favoritePetLiked: "Succesfully added " + favoritePetName + " to favorites!" });
};