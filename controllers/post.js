const xss = require('xss')

exports.postForm = (req, res) => {
    res.render('postform')
}

exports.submit = async (req, res) => {
    try {
        let newPet = {
            _id: req.files[0].destination.split('/').at(-1),
            date: new Date(),
            age: xss(req.body.age),
            name: xss(req.body.name),
            species: xss(req.body.species),
            trait: xss(req.body.trait),
            liked: false,
            comments: []
        }

        console.log(newPet)
    } catch (err) {
        console.log(err.stack)
    }
}