import express from 'express'

import {getNotes, getNote, createNote} from './database.js'

const app = express()

app.get("/notes", (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
}) 

app.listen(8080, () => {
    console.log('Server is running on port 8080')
}) 
