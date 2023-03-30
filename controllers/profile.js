const {
    Db
} = require("mongodb")

exports.mijnProfiel = (req, res) => {
    res.render('profile.ejs')
}

exports.profielPagina = async (req, res) => {
    const data = await req.app.get('database').collection('users').find().toArray()
    res.render('profile.ejs', {
        data: data
    })
}