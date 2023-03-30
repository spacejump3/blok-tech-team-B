const {
    Db
} = require("mongodb")

exports.profielPagina = async(req, res) => {
    const data = await req.app.get('database').collection('users').find().toArray()
    res.render('profile.ejs',{
        data: data
    })
}

