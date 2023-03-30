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
    const password_filled = req.body.wachtwoord.toLowerCase()

    const user = await req.app.get('database').collection('users').findOne({
      email: email_filled,
      password: password_filled,
    })

    // console.log(user)

    if (user) {
      req.session.user = user
      // de gebruiker is gevonden de sessie word nu gestart voor de gebruiker
      console.log(req.session.user)

      // de gebruiker word nu gestuurd naar mijn profiel route
      res.redirect('/profile', {username: req.session.user.username})
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
  }
}