const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let morgan = require('morgan')
const cors = require('cors')

app.use(cors())



app.use(bodyParser.json());


morgan.token('body', function (req, res) {
  
  const obj = {name:req.body.name,phone:req.body.number}
   
  return JSON.stringify(obj);
})
app.use(morgan(':method :url :body :status :res[content-length] :response-time ms'))


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

//
// Nimi:Matti Kinnunen
// Opnro:268351
//

app.get('/api/persons', (req, res) => {



  res.json(persons)
})

app.get('/info', (req, res) => {
  let date = new Date();
  let returnable = "puhelinluettelossa " + persons.length + " henkilön tiedot. \n" + date;

  res.writeHead(200, { 'Content-Type': 'text/plain', 'charset': "utf-8" })
  res.end(returnable)

})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {

  const person = request.body
  let obj = persons.find(function (obj) { return obj.name === person.name; });

  if (person.name === undefined) {
    return response.status(400).json({ error: 'name missing' })

  } else if (person.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  } else if (obj !== undefined) {
    return response.status(400).json({ error: 'name must be unique' })
  }
  person.id = Math.floor(Math.random() * Math.floor(100))

  persons = persons.concat(person)

  response.json(person)
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
