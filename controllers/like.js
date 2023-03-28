exports.like = async (req, res) => {
    const favoritePet = req.body.favorite;
    console.log(favoritePet);

    const filter = { name: favoritePet };

    const updateDocument = { $set: { liked: true} };

    const update = await animals.updateOne(filter, updateDocument);

    res.render('/view/favorited', { favoritePet });
};
