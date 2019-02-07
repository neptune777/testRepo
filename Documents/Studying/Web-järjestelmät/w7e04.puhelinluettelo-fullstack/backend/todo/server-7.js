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

    const Pers = request.body

    if (Pers.name === undefined) {
        return response.status(400).json({ error: 'name missing' })

    } else if (Pers.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    Person
        .find({ name: request.body.name })
        .then(result => {

            if (result.length === 0) {

                const obj = new Person({
                    name: request.body.name,
                    number: request.body.number

                })

                obj
                    .save()
                    .then(savedPerson => {

                        response.json(Person.format(savedPerson))
                    }).catch(error => {
                        console.log(error)
                        // ...
                    })

            } else {
                return response.status(412).json({ error: 'name has a phone number already' })

            }
        })





})


app.delete('/api/persons/:id', (request, response) => {


    if (request) {

    }
    Person
        .findOneAndRemove({ _id: request.params.id })
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })

})


app.put('/api/persons/:id', (request, response) => {


    if (request) {

    }
    Person
        .findOneAndUpdate(
            { "_id": request.body.id },
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

    Person
        .find({ "_id": req.params.id })
        .then(result => {

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
            let length = Object.values(result).length
            
            let returnable = "puhelinluettelossa " + length + " henkilön tiedot. \n" + date;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
