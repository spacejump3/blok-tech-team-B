const {
    Db
} = require("mongodb")
const ObjectId = require('mongodb').ObjectId
const session = require('express-session')

exports.mijnProfiel = (req, res) => {
    const user = req.session.user

    exports.profielPagina = async (req, res) => {
        userid = req.session.userid

        const data = await req.app.get('database').collection('users').findOne({ _id: new ObjectId(userid) })

        res.render('profile.ejs', {
            data: data
        })
    }
}