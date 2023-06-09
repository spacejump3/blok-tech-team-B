// special thanks to the teachers, studentassistants and fellow students for giving advice and helping me with my work

// hidden in env
require('dotenv').config()

// import express application
const express = require('express')
const session = require('express-session')
// import gzip
const compression = require('compression')

const app = express()

// express listens to the port. 4000 shows in console
const port = 4000

// connecting mongoDB account with database
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
})
const dbName = 'testdatab'

// connecting a specific datbase with the collection form
client.connect((err) => {
    // when the connection fails, show error
    console.log(err)
})

app.set('database', client.db(dbName)) //https://stackoverflow.com/a/25670767

// import ejs view engine
app.set('view engine', 'ejs')

// express middleware to help with HTTP requests for node.js
app.use(
    express.urlencoded({
        extended: true
    })
)

// express uses the map static to
app.use('/static/', express.static('./static'))

// gzip
app.use(compression())

// is looking for a view map with ejs files
app.set('views', 'view')

// het maken van een sessie met een secret code
app.use(
    session({
        secret: process.env.SESCODE, // geheime code om de sessie te versleutelen
        resave: false, // zorgt ervoor dat de sessie niet telkens opnieuw wordt opgeslagen als er geen wijzigingen zijn
        saveUninitialized: true // slaat een sessie op, zelfs als er geen gegevens zijn opgeslagen
    })
)

// all pages
// home
app.get('/', function (req, res) {
    res.render('index')
})

// routes
const liked = require('./routes/liked.js')
app.use('/liked', liked)

const favorites = require('./routes/favorites.js')
app.use('/favorites', favorites)

const removeLike = require('./routes/removelike.js')
app.use('/removelike', removeLike)

const postRoutes = require('./routes/post.js')
app.use('/post', postRoutes)

const resultRoutes = require('./routes/result.js')
app.use('/result', resultRoutes)

app.use('/login', require('./routes/login.js'))

app.use('/register', require('./routes/register.js'))

app.use('/profile', require('./routes/profile.js'))

// 4000 shows in the console to let know it works
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// when an user is calling an unknow url, an error occurs
app.use(function (req, res) {
    res.status(404).render('404page')
})
