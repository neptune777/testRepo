const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())



app.use(bodyParser.json());


morgan.token('body', function (req, res) {
  
  const obj = {name:req.body.name,phone:req.body.number}
   
  return JSON.stringify(obj);
})
app.use(morgan(':method :url :body :status :res[content-length] :response-time ms'))




//
// Nimi:Matti Kinnunen
// Opnro:268351
//

app.get('/api/persons', (req, res) => {
  console.log('Dröt')

  Person
  .find({})
  .then(Persons => {
      console.log('all persons from mongo-db',Persons)
      res.json(Persons.map(Person.format))
  }) 
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
