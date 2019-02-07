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


            // console.log("Töttöröö!",result.map(Person.format))
            res.json(result.map(Person.format))



        }).catch(error => {
            console.log(error)
            res.status(404).end()
        })
})

app.post('/api/persons', (request, response) => {
    console.log('Täällä', request.body)
    const Pers = request.body
    const obj = new Person({
        name: request.body.name,
        number: request.body.number

    })



    if (Pers.name === undefined) {
        return response.status(400).json({ error: 'name missing' })

    } else if (Pers.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    obj
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        }).catch(error => {
            console.log(error)
            // ...
        })

})


app.delete('/api/persons/:id', (request, response) => {


    if (request) {
        console.log('namee', request.params.id)
    }
    Person
        .findOneAndRemove({ name: request.params.id })
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })





})


app.put('/api/persons/:id', (request, response) => {


    if (request) {
        console.log('name', request.params.name)
        console.log('object', request.body)
    }
    Person
        .findOneAndUpdate(
            { "name": request.body.name },
            { $set: { "number": request.body.number } }
        )
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })

})

app.get('/api/persons/:id', (req, res) => {

    console.log("id", req.params.id)
    Person
        .find({ "_id": req.params.id })
        .then(result => {

            console.log('result', result)
            res.json(Person.format(result[0]))



        }).catch(error => {
            console.log(error)
            res.status(204).end()
        })
})


app.get('/info', (req, res) => {


    Person
        .find({})
        .then(result => {

            let date = new Date();
            let length = result.map.length
            let returnable = "puhelinluettelossa " + length + " henkilön tiedot. \n" + date;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            //res.write(encodeURIComponent.myText.toString('utf8'));
            res.end(returnable)



        }).catch(error => {
            console.log(error)
            res.status(404).end()
        })







})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
