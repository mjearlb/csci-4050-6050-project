const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser} = require('./database.js');

app.get('/date', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
