const xss = require('xss')
const ObjectId = require('mongodb').ObjectId

exports.postForm = async (req, res) => {

    if(await req.app.get('database').collection('users').findOne({_id: new ObjectId(req.session.userid)}) == null) {
        res.redirect('/login')
    }

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

        result = await req.app.get('database').collection('pets').insertOne(newPet)

        if(req.headers.accept.includes('application/json')) {
            res.send({
                success: true,
                id: result.insertedId
            })
        } else {
            res.redirect(`/advertentie/${result.insertedId}`)
        }

    } catch (err) {
        console.log(err.stack)
    }
}