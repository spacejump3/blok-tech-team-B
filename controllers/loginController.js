const {
  Db
} = require("mongodb")

exports.inlogPagina = (req, res) => {
  res.render('login.ejs')
}

exports.inloggen = async (req, res) => {
  try {
    const email_filled = req.body.email.toLowerCase()
    const password_filled = req.body.wachtwoord.toLowerCase()

    const userValidation = await req.app.get('database').collection('users').findOne({
      email: email_filled,
      password: password_filled
    })

    console.log(userValidation)

    if (!userValidation) {
      res.send('geen gebruiker gevonden')
    } else {
      res.send('ingelogd...')
    }
  } catch (err) {
    console.log(err)
  }
}