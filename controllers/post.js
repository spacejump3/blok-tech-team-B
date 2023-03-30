const xss = require('xss')

exports.postForm = (req, res) => {
    res.render('postform')
}

exports.submit = async (req, res) => {
    try {

        let id = req.files[0].destination.split('/').at(-1)

        let newPet = {
            _id: id,
            date: new Date(),
            age: xss(req.body.age),
            name: xss(req.body.name),
            species: xss(req.body.species),
            trait: xss(req.body.trait),
            liked: false,
            comments: []
        }

        await req.app.get('database').collection('pets').insertOne(newPet)

        res.redirect(`/result/${id}`)

    } catch (err) {
        console.log(err.stack)
    }
}