// special thanks to the teachers, studentassistants and fellow students for giving advice and helping me with my work

// hidden in env
require('dotenv').config()

// import express application 
const express = require('express')
const app = express()

// express listens to the port. 4000 shows in console
const port = 4000

// connecting mongoDB account with database 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const dbName = 'testdatab'

// connecting a specific datbase with the collection form
client.connect(err => {
    // when the connection fails, show error
    console.log('error')
});

app.set('database', client.db(dbName)) //https://stackoverflow.com/a/25670767


// import ejs view engine 
app.set('view engine', 'ejs')

// express middleware to help with HTTP requests for node.js
app.use(express.urlencoded({ extended: true }))

// express uses the map static to 
app.use('/static/', express.static('./static'))

// is looking for a view map with ejs files
app.set('views', 'view')

// all pages
// home
app.get('/', function(req, res) {
    res.render('index')
})

// routes
const likeAnimal = require('./routes/like.js')
app.use('/favorited', likeAnimal)

const favorites = require('./routes/favorites.js')
app.use('/favorites', favorites)

const postRoutes = require('./routes/post.js')
app.use('/post', postRoutes)

const resultRoutes = require('./routes/result.js')
app.use('/result', resultRoutes)

// 4000 shows in the console to let know it works
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// when an user is calling an unknow url, an error occurs
app.use(function(req, res, next) {
    res.status(404).render('404page')
})