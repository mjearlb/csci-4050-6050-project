const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path')

const {getUsers, getUser, createUser, getComments, changeEmail, purchaseTicket, registerUser, removeUser, getCartItems} = require('./database.js');

app.use(express.json());


app.get('/getCommentsFromSQL', async (req, res) => {
    try {
        const comments = await getComments(); // Fetch comments from the database
        res.json(comments); // Send comments as JSON response
    } catch (error) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/comments.html'))
})



app.get('/getCartItemsFromSQL', async (req, res) => {
    try {
        const cart = await getCartItems(1000); // Fetch comments from the database
        res.json(cart); // Send comments as JSON response
    } catch (error) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'))
}) 





// Calls the getUser() DB method
// returns the user with the specified ID
app.get('/users/getUser/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the registerUser() DB method
// registers a user account
app.post('  ', async (req, res) => { 
    try {
        const { username, lastname, firstname, email, password } = req.body;
        const result = await registerUser(username, lastname, firstname, email, password);
        if (result) {
            res.status(200).send('User successfully registered');
        } else {
            res.status(500).send('User registration failure');
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'))
})

app.post('/users/deleteUser', async (req, res) => { 
    try {
        const {username} = req.body;
        console.log("Username:", username);
        const result = await removeUser(username); //(username, lastname, firstname, email, password);
        if (result) {
            res.status(200).send('User successfully registered');
        } else {
            res.status(500).send('User registration failure');
        } 
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.get('/deleteUser', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/deleteUser.html'))
})

// Calls the getUser() DB method
// returns the user with the specified ID
app.get('/users/getUser/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
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

app.get('/date', (req, res) => {
    res.send(`<h1>${Date()}</h1>`)
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
