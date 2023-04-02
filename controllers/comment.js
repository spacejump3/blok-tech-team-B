const ObjectId = require('mongodb').ObjectId

exports.createComment = async (req, res) => {
    const petId = req.params.id;
    const commentText = req.body.comment

    try {
        let pet = await req.app.get('database').collection('pets').updateOne(
            {_id: ObjectId(petId)},
            {$push: {comments: {text: commentText, date: new Date()}}},
            (err, result) => {
                if (err) throw err;
                res.redirect('/result/${petId}')
            }
        )
    }
    catch (err) {

    }
}

exports.getComment = async (req, res) => {
    const petId = req.params.id

    try {
        let pet = await req.app.get('database').collection('pets').findOne({ _id: ObjectId(petId) }, (err, post) => {
            if (err) throw err
            res.render('single-animal', { pet: pet })
        })
    }
    catch (err) {

    }

}

// exports.createComment = (req, res) => {
//     const petId = req.params.id;
//     const commentText = req.body.comment

//     db.collection('pets').updateOne(
//         {_id: ObjectId(petId)},
//         {$push: {comments: {text: commentText, date: new Date()}}},
//         (err, result) => {
//             if (err) throw err;
//             res.redirect('/result/${petId}')
//         }
//     )
// }

// exports.getComment = (req, res) => {
//     const petId = req.params.id

//     db.collection('pets').findOne({ _id: ObjectId(petId) }, (err, post) => {
//         if (err) throw err
//         res.render('single-animal', { pet: pet })
//     })
// }