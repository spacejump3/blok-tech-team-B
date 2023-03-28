exports.postForm = (req, res) => {
    res.render('postform')
}

exports.submit = (req, res) => {
    console.log(req.files)
}