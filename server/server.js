const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path')

const {getUsers, getUser, createUser, getComments, changeEmail, purchaseTicket, registerUser, removeUser, getCartItems, verifyLogin} = require('./database.js');

app.use(express.json());

// simple display comments
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

// simple display cart items for 1000
app.get('/cart/getItems/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const cart = await getCartItems(username);
        res.json(cart);
    } catch (error) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});
/* Working on now
app.get('/cart/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'))
}) */

// simple register user
app.post('/users/registerUser', async (req, res) => { 
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

// simple delete user
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

// simple verify login
app.get('/verifyLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/verifyLogin.html'))
}) 
app.post('/verifyLogin', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("Username: ", username);
        console.log("Password: ", password);
        const success = await verifyLogin(username, password);
        if (success) {
            // If login successful, get user information
            const user = await getUser(username);
            res.json({ success: true, user: user });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error verifying login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// simple login to acocunt screen
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'))
}) 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("Username: ", username);
        console.log("Password: ", password);
        const success = await verifyLogin(username, password);
        if (success) {
            // If login successful, get user information
            const user = await getUserByUsername(username);
            res.json({ success: true, user: user });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error verifying login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
app.get('/account/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/account.html'))
}) 
app.get('/account/userinfo/:username', async (req,res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// simple example of header
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/homepage.html'))
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
