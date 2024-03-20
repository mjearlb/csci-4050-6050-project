const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser} = require('./database.js');


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/goodbye`)
})
