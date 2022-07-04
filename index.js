const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
require("dotenv").config()
const app = express()
const Person = require("./models/person")
app.use(express.json())
app.use(cors())
const path = require('path')
morgan.token("post", (req) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post"))

console.log(__dirname)

app.use("/a", express.static(path.join(__dirname, 'frontend/build')))

app.get("/asd", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
})


app.get("/info", (req, res) => {
    console.log(Date.now())
    Person.estimatedDocumentCount()
        .then(count => {
            res.send(`Phonebook has info for ${count} people <p> ${Date()} </p>`
            )
        })
})

app.get('/api/persons', (req, res) => {
    Person.find()
        .then(persons => {
            res.json(persons)
        })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.get("/health", (req, res) => {
    res.send("ok")
})

app.delete("/api/persons/:id", (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))

})

app.post("/api/persons", (req, res, next) => {

    const person = new Person({
        name: req.body["name"],
        number: req.body["number"],
    })

    person.save()
        .then(saved => {
            res.json(saved)
        })
        .catch(error => next(error))

})

app.put("/api/persons/:id", (req, res, next) => {
    const person = {
        name: req.body["name"],
        number: req.body["number"],
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: "query" })
        .then(updated => {
            res.json(updated)
        })
        .catch(error => next(error))
})

const badEndpoint = (req, res) => {
    res.status(404).send({
        error: "Website broke or you are looking for a bad endpoint"
    })
}

app.use(badEndpoint)

const handleError = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({
            error: `Bad id!`
        })
    }
    if (error.name === "ValidationError") {
        return res.status(400).send({
            error: error.message
        })
    }
    next(error)
}

app.use(handleError)

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/persons`)
})