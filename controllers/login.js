const {
  Db
} = require("mongodb")
const session = require('express-session')

exports.inlogPagina = (req, res) => {
  res.render('login.ejs')
}

exports.inloggen = async (req, res) => {
  try {
    const email_filled = req.body.email.toLowerCase()
    const password_filled = req.body.wachtwoord

    const userValidation = await req.app.get('database').collection('users').findOne({
      email: email_filled,
      password: password_filled,
    })

    if (userValidation) {
      res.redirect('/profile')
      console.log(userValidation)
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
  }
}