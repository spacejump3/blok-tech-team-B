exports.postForm = (req, res) => {
    res.render('postform')
}

exports.submit = async (req, res) => {
    try {
        let newPet = {
            _id: req.files[0].destination.split('/').at(-1),
            age: req.body.age,
            name: req.body.name,
            species: req.body.species,
            trait: req.body.trait,
            liked: false,
            comments: []
        }

        console.log(newPet)
    } catch (err) {
        console.log(err.stack)
    }
}