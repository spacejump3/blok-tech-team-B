// mongo en bcrypt worden opgehaald
const bcrypt = require('bcrypt')

// gebruiker wordt naar de registreren pagina gestuurd
exports.registrerenPagina = (req, res) => {
    res.render('register.ejs')
}

// wanneer iemand een account wordt aangemaakt gaat dit asynchroon en komt de username en email in lowercase
exports.accountAanmaken = async (req, res) => {
    try {
        const usernameFilled = req.body.username.toLowerCase()
        const emailFilled = req.body.email.toLowerCase()
        const passwordFilled = req.body.wachtwoord

        // controleert of de gebruiker al bestaat in de database
        const userExist = await req.app
            .get('database')
            .collection('users')
            .findOne({
                $and: [
                    {
                        username: usernameFilled
                    },
                    {
                        email: emailFilled
                    }
                ]
            })
        // wanneer de user al bestaat wordt die doorgeleid naar de error page
        if (userExist) {
            res.render('error.ejs')
        }

        // als de gebruiker niet bestaat, voeg dan de nieuwe gebruiker toe aan de database
        else {
            const hashedPassword = await bcrypt.hash(passwordFilled, 5)
            const newUser = {
                username: usernameFilled,
                email: emailFilled,
                password: hashedPassword
            }
            // de info wordt in de database collectie users opgeslagen als een nieuwe gebruiker
            await req.app.get('database').collection('users').insertOne(newUser)
            res.redirect('/profile')
        }
    } catch (err) {
        console.log(err)
    }
}
