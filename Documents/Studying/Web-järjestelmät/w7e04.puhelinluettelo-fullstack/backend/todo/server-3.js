const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())



app.use(bodyParser.json());


morgan.token('body', function (req, res) {

    const obj = { name: req.body.name, phone: req.body.number }

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
        .then(result => {
            
                res.json(result.map(Person.format))
              
       
            
        }).catch(error => {
            console.log(error)
            res.status(404).end()
          })
})


app.post('/api/persons', (request, response) => {
    const obj_ = {
        name: request.body.name,
        number: request.body.number,
        _id:23

    };

   
    //console.log('Täällä',request.body)
    const Pers = request.body
    const obj = new Person({
        name: request.body.name,
        number: request.body.number
        

    })

  

    //let obj = persons.find(function (obj) { return obj.name === person.name; });
  
    if (Pers.name === undefined) {
      return response.status(400).json({ error: 'name missing' })
  
    } else if (Pers.number === undefined) {
      return response.status(400).json({ error: 'number missing' })
    }// else if (obj !== undefined) {
    //  return response.status(400).json({ error: 'name must be unique' })
   // }
   // obj.id = Math.floor(Math.random() * Math.floor(100))

   //const pers = Person.format(Person);
   let j;
  obj
    .save()
    .then(savedPerson => {
         j = Person.format(savedPerson)
        
      response.json(j)
    }).catch(error => {
        console.log(error)
        // ...
      })
    
  })





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
