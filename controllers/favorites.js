exports.favorites = async (req, res) => {
    const query = { liked: true };

    const cursor = await req.app.get('database').collection('pets').find(query);

    const favorites = await cursor.toArray();

    res.render('favorites', { favorites });
};
