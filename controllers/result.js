const ObjectId = require('mongodb').ObjectId

exports.loadSingleAnimal = async (req, res) => {
    console.log(req.params.id)
    try {
        let resultPet = await req.app.get('database').collection('pets').findOne({
            _id: new ObjectId(req.params.id)
        })

        let sortedComments = resultPet.comments.sort((current, next) => {
            return new Date(next.date) - new Date(current.date)
        })
        console.log(resultPet)
        res.render('single-animal', {resultPet, sortedComments})
    }
    catch (err) {
        console.log(err.stack)
    }
}

exports.createComment = async (req, res) => {
    if(await req.app.get('database').collection('users').findOne({_id: new ObjectId(req.session.userid)}) == null) { 
        res.redirect('/login') 
        return
    }
    const petId = req.body.petId
    let resultPet = await req.app.get('database').collection('pets').findOne({
        _id: new ObjectId(petId)
    })

    let comments = resultPet.comments
    
    comments.push({
        userId: new ObjectId(req.session.userid),
        comment: req.body.comment,
        date: new Date()
    })
    console.log(comments)

    let pushComment = await req.app.get('database').collection('pets').updateOne(
        {_id: new ObjectId(petId)}, {$set:{comments: comments}})


    res.redirect(`/result/${petId}`)

    // console.log(resultPet)
}

exports.loadResults = async (req, res) => {
    try {
        const petList = {
            soort: req.body.soort,
            age: req.body.age,
            trait: req.body.trait
        }

        await req.app.get('database').collection('submission').insertOne(petList) //https://stackoverflow.com/a/25670767

        // based on the answers the user will be paired with an animal
        let resultPet = await req.app.get('database').collection('pets').find({
            $and: [
                { soort: req.body.soort },
                { age: req.body.age },
            ]
        }).toArray()


        // when the answers match with an animal, it shows. otherwise there is an error
        if(resultPet) {

            // an array is made based on the checked traits and will be showed seperately. flat makes it easier to filter through the erray
            if(req.body.trait) {
                // Zet de waarde van req.body.trait 
                [req.body.trait].flat().forEach(trait => {
                    resultPet = resultPet.filter(pet => {
                        return pet.trait.includes(trait)
                    })
                })
            }
            // to prevent empty results in the database
            if(resultPet.length < 1) {
                res.send('no results')
                return false
            }
            // ejs page loads in with the results
            res.render('result', { resultPet, petList })
        } else {
            res.send('no results')
        }
        // when errors occur, the server won't crash but will be displayed in the console.
    } catch (err) {
        console.log(err.stack)
    }

}