require('dotenv').config()
const express = require('express')
const app = express()
//const fruits = require('./models/fruits.js')
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')


//MUST BE FIRST 
//middleware
app.use((req, res, next)=>{
  console.log('I run for all routes')
  next()
})
//keep this near the top 
app.use(express.urlencoded({extened:false}))

//set up view engine above routes
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//index route : Show ALL 
app.get('/fruits', function (req, res) {
    Fruit.find({}, (error, allFruits) => {
      res.render('Index', {
        fruits: allFruits
      })
    })
  })

//create a page that will allow us to create a new fruit 
app.get('/fruits/new', (req,res)=>{
  res.render('New')
})


 
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){//if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true //set equal to true so it doesn't get passed as 'on' 
    }
    else {
      //if it is not checked req.body.readyToEat is undefined
      req.body.readyToEat = false
    }
    Fruit.create(req.body, (error, createdFruit)=>{
      res.redirect('/fruits')
    })
    
    console.log(fruits)
    console.log(req.body)
  
    // res.redirect('/fruits') //send the user back to /fruits
  })

  //show route
app.get('/fruits/:id', function(req, res){
  Fruit.findById(req.params.id, (err, foundFruit)=>{
    console.log(fruits)
    console.log(req.body)
    console.log(foundFruit)
    res.render('Show', {fruit:foundFruit})
  })
})

//form POST 


//connect to mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})


app.listen(3000, () => {
  console.log("listening")
})
