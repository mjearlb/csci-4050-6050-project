const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, createUser} = require('./database.js');

app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})


app.get('/date', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
})

app.get('/users', async (req, res) => {
    try {
	const users = await getUsers();
	res.json(users);
    } catch (err) {
	console.error(err);
	res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/date`)
})
