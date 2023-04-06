const session = require('express-session')
const bcrypt = require('bcrypt')

exports.inlogPagina = (req, res) => {
    res.render('login.ejs')
}

exports.inloggen = async (req, res) => {
    try {
        const emailFilled = req.body.email.toLowerCase()
        const passwordFilled = req.body.wachtwoord

        // ingevulde wachtwoord moet overeenkomen met de hash
        // Controleert of beide voorwaardes voldoen om verder in te loggen
        const userValidation = await req.app
            .get('database')
            .collection('users')
            .findOne({
                email: emailFilled
            })

        if (userValidation) {
            // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord uit de database
            const isMatch = await bcrypt.compare(
                passwordFilled,
                userValidation.password
            )

            if (isMatch) {
                req.session.userid = userValidation._id
                req.session.save()
                res.redirect('/profile')
            } else {
                res.redirect('/login/failed')
            }
        } else {
            res.redirect('/login/failed')
        }
    } catch (err) {
        console.log(err)
    }
}

exports.inloggenMislukt = (req, res) => {
    res.render('loginFailed.ejs')
}
