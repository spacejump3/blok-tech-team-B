const {
    Db
} = require("mongodb")

exports.registrerenPagina = (req, res) => {
    res.render('register.ejs')
}

exports.accountAanmaken = async (req, res) => {
    try {
        const username_filled = req.body.username.toLowerCase()
        const email_filled = req.body.email.toLowerCase()
        const password_filled = req.body.wachtwoord.toLowerCase()

// controleer of de gebruiker al bestaat in de database 
        const userValidation = await req.app.get('database').collection('users').findOne({
            $or: [
                { username: username_filled },
                { email: email_filled }
            ]
        })
        if (userValidation) {
            return res.status(409).redirect('/error');
        }

// als de gebruiker niet bestaat, voeg dan de nieuwe gebruiker toe aan de database 
        const newUser = {
            username: username_filled,
            email: email_filled,
            password: password_filled
        }
        await req.app.get('database').collection('users').insertOne(newUser)
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
    }
}