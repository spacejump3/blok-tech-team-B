const {
    Db
} = require("mongodb")
const session = require('express-session')

exports.mijnProfiel = (req, res) => {
    const user = req.session.user

    if (!user) {
        res.redirect('/login')
    } else {
        res.render('profile.ejs', {
            user
        })
    }
}