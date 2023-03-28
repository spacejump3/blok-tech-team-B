exports.favorites = async (req, res) => {
    const query = { liked: true };

    const cursor = dbName.find(query);

    const favorites = await cursor.toArray();

    res.render('/view/favorites', { favorites });
};
