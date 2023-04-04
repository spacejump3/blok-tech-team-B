// the data from the form will be showed in mongodb whenever someone fills in the form
const ObjectId = require('mongodb').ObjectId

exports.loadSingleAnimal = async (req, res) => {
    console.log(req.params.id)
    try {
        let resultPet = await req.app.get('database').collection('pets').findOne({
            _id: new ObjectId(req.params.id)
        })
        console.log(resultPet)
        res.render('single-animal', {resultPet})
    }
    catch (err) {
        console.log(err.stack)
    }
}

// app.post('/single-animal', function (req, res) => {
//     const collection = db.collection('comments')
//     const comment = {
//         name: req.body.name,
//         email: req.body.email,
//         comment: req.body.comment,
//         timestamp: new Date()
//     }
//     collection.insertOne(comment, (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     })
// })

// app.get('/', (req, res) => {
//     const collection = db.collection('comments')
//     collection.find().sort({ timestamp: -1 }).toArray((err, comments) => {
//       if (err) {
//         console.error(err)
//         return
//       }
//       res.render('index', { comments })
//     })
//   })

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