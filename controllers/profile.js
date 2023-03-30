const {
    Db
} = require("mongodb")
const ObjectId = require('mongodb').ObjectId

exports.mijnProfiel = (req, res) => {
    res.render('profile.ejs')
}

exports.profielPagina = async (req, res) => {
    userid = req.session.userid

    const data = await req.app.get('database').collection('users').findOne({ _id: new ObjectId(userid) })

    res.render('profile.ejs', {
        data: data
    })
}