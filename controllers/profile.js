const {
    Db
} = require("mongodb")
const ObjectId = require('mongodb').ObjectId
const session = require('express-session')


exports.profielPagina = async (req, res) => {
    userid = req.session.userid

    const data = await req.app.get('database').collection('users').findOne({
        _id: new ObjectId(userid)
    })

    if (data) {
        res.render('profile.ejs', {
            data: data
        })
    } else {
        res.redirect('/login')
    }
}

exports.profielBewerken = async (req, res) => {
    userid = req.session.userid
    const {
        username,
        email,
        wachtwoord
    } = req.body;

    //vinden van het account wat is ingelogd
    const userData = await req.app.get('database').collection('users').findOneAndUpdate({
        _id: new ObjectId(userid),
    }, {
        $set: {
            username: username,
            email: email,
            password: wachtwoord
        }
    })
    res.redirect('/profile')
}

exports.profielUitloggen = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};