const {
    Db
} = require("mongodb")
const bcrypt = require('bcrypt');

exports.registrerenPagina = (req, res) => {
    res.render('register.ejs')
}

exports.accountAanmaken = async (req, res) => {
    try {
        const username_filled = req.body.username.toLowerCase()
        const email_filled = req.body.email.toLowerCase()
        const password_filled = req.body.wachtwoord

// controleer of de gebruiker al bestaat in de database 
        const userExist = await req.app.get('database').collection('users').findOne({
            $and: [
                { username: username_filled },
                { email: email_filled }
            ]
        })
        if (userExist) {
            res.render('error.ejs');
        }

// als de gebruiker niet bestaat, voeg dan de nieuwe gebruiker toe aan de database
        else {
            const hashedPassword = await bcrypt.hash(password_filled, 5)
            const newUser = {
                username: username_filled,
                email: email_filled,
                password: hashedPassword
            }

            await req.app.get('database').collection('users').insertOne(newUser)
            res.redirect('/profile')
        }
    } catch (err) {
        console.log(err)
    }
}