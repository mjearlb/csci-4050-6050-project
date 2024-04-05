const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path')

const {getUsers, getUser, createUser, getComments, getCartItems} = require('./database.js');

app.get('/users', async (req, res) => {
    try {
    	const users = await getUsers();
	    res.json(users);
    } catch (err) {
	    console.error(err);
	    res.status(500).send('Something went wrong');
    }
})

app.get('/date', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
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

app.get('/cart', async (req, res) => {
    try {
        const cart = await getCartItems(1000)
        // res.json(cart)
        res.sendFile(path.join(__dirname, "public/cart.html"))
        // res.sendFile(path.join(__dirname, "public/cart.html"), {cart})
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/button', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/buttonTest.html'))
})

app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} and http://localhost:${PORT}/date`)
})
