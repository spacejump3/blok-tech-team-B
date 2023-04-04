const {
  Db
} = require("mongodb")
const session = require('express-session')
const bcrypt = require('bcrypt');

exports.inlogPagina = (req, res) => {
  res.render('login.ejs')
}

exports.inloggen = async (req, res) => {
  try {
    const email_filled = req.body.email.toLowerCase()
    const password_filled = req.body.wachtwoord

    // ingevulde wachtwoord moet overeenkomen met de hash
    // Controleert of beide voorwaardes voldoen om verder in te loggen
    const userValidation = await req.app.get('database').collection('users').findOne({
      email: email_filled
    })

    if (userValidation) {
      // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord uit de database
      const isMatch = await bcrypt.compare(password_filled, userValidation.password)

      if (isMatch) {
        req.session.userid = userValidation._id
        req.session.save()
        res.redirect('/profile')
      } else {
        res.redirect('/login/onjuist')
      }
    } else {
      res.redirect('/login/onjuist')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.inloggenMislukt = (req, res) => {
  res.render('loginFailed.ejs')
}

