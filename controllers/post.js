const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'static/upload/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
})

const upload = multer({
    storage: storage
})

exports.postForm = (req, res) => {
    res.render('postform')
}

exports.submit = (req, res) => {

}