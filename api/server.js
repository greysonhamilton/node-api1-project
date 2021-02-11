// BUILD YOUR SERVER HERE
const express = require ('express')
const db = require('./users/model')

const server = express();

server.use(express.json)

server.post('/api/users', (req, res) => {

    const newUser = db.insert({

        name: req.body.name,
        bio: req.body.bio

    })

    if (newUser) {

        res.status(201).json(newUser)

    } else {

        res.status(400).json({
            message: "Please provide name and bio for the user"
        })

        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }

})

server.get('/api/users', (req, res) => {

    const users = db.find()

    if (users) {
        res.json(users)

    } else {
        
        res.status(500).json({
            message: "The users information could not be retrieved"
        })

    }

})

server.get('/api/users/:id', (req, res) => {

    const user = db.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }

})

server.delete('/api/users/:id', (req, res) => {

    const user = db.findById(req.params.id)

    if (user) {
        db.remove(user.id)

        res.status(204).end()

    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
        res.status(500).json({
            message: "The user could not be removed"
        })
    }

})

server.put('/api/users/:id', (req, res) => {

    const user = db.findById(req.params.id)

    if (user) {

        const editUser = db.update(

            user.id, {
                name:req.body.name,
                bio:req.body.bio
            })

            res.json(editUser)

    } else {

        res.status(404).json({
            message: "The user with the specified ID does not exits"
        })
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
        res.status(500).json({
            message: "The user information could not be modified"
        })

    }

})

module.exports = server; // EXPORT YOUR SERVER instead of {}
