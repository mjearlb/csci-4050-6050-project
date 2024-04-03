const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser, getComments} = require('./database.js');

app.get('/users', async (req, res) => {
    try {
	const users = await getUsers();
	res.json(users);
    } catch (err) {
	console.error(err);
	res.status(500).send('Something went wrong');
    }
})

app.get('/login', async (req, res) => {
    res.send("login here:")
})

app.get('/comments', async (req, res) => {
    try {
        const users = await getComments();
        res.json(users);
        } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/date`)
})
