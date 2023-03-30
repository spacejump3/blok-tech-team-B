const {
    Db
} = require("mongodb")

exports.mijnProfiel = (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
      }    
    res.render('profile.ejs')
}

