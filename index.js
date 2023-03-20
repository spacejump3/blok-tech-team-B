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
const database = client.db(dbName);
const submission = database.collection('form')
const animal = database.collection('pets')


// connecting a specific datbase with the collection form
client.connect(err => {
    const collection = client.db("testdatab").collection("form")
// when the connection fails, show error
    console.log('error')
    client.close()
  });

// import ejs view engine 
app.set('view engine', 'ejs')

// express middleware to help with HTTP requests for node.js
app.use(express.urlencoded({extended: true}))

// express uses the map static to 
app.use('/static/', express.static('./static'))

// starting the view engine for ejs files
app.set('view engine', 'ejs')
// is looking for a view map with ejs files
app.set('views', 'view')

// all pages
// calling ejs and returning in html
app.get('/', function(req, res) {
    res.render('index.ejs')
  })

// the data from the form will be showed in mongodb whenever someone fills in the form
app.post('/result', async (req, res, next) => {
    try {
        const petList = {
            soort: req.body.soort,
            age: req.body.age,
            trait: req.body.trait
        }
        await submission.insertOne(petList)

        // to check if the servers connects and if the data is incorperated correctly
        console.log(req.body)

        // based on the answers the user will be paired with an animal
        let resultPet = await animal.find(
            {
                $and: [
                    { soort: req.body.soort},
                    { age: req.body.age},
                ]
            }
        ).toArray()


        // when the answers match with an animal, it shows. otherwise there is an error
        if (resultPet) {
        
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
            if(resultPet.length  < 1) {
                res.send('no results')
                return false
            }
            // ejs page loads in with the results
            res.render('result', {resultPet, petList})
        }
        else {
            res.send('no results')
        }
    // when errors occur, the server won't crash but will be displayed in the console.
    } catch (err) {
        console.log(err.stack)
    }
    
})

  
// 4000 shows in the console to let know it works
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })

// when an user is calling an unknow url, an error occurs
  app.use(function (req, res, next) {
    res.status(404).render('404page')
})





