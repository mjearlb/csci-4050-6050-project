const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000;

const {getUsers, getUser, getUserByUsername, createUser, getComments, changeEmail, purchaseTicket, registerUser, removeUser, verifyLogin, getCart, addCartItem, removeCartItem, getMerchandise, getAllMerchandise} = require('./database.js');

app.use(express.json());
app.use(express.static("public"));

// Redirect to login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'))
});

// Registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'))
});

// Home page
app.get('/home/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'))
}) 

// Tickets page
app.get('/tickets/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/tickets.html'))
}) 

// Purchased tickets page
app.get('/tickets/purchased/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/purchasedTickets.html'))
}) 

// Get tickets page
app.get('/tickets/:type/:username', (req, res) => {
    const username = req.params.username;
    const type = req.params.type;
    res.sendFile(path.join(__dirname, 'public/getTickets.html'))
}) 

// Community page
app.get('/community/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/community.html'))
}) 

// Shop page
app.get('/shop/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/shop.html'))
}) 

// Cart page
app.get('/cart/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/Cart.html'))
}) 

// Account page
app.get('/account/:username', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/account.html'))
}) 


// Admin commands used to return database items
// Admin use to verify login
app.post('/admin/verifyLogin', async (req, res) => {
    const { username, password } = req.body;
    try {
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

// Admin use to get user info from username
app.get('/admin/getUser/username/:username', async (req,res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
})

// Admin use to get all items for username
app.get('/admin/cart/getItems/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const cart = await getCart(username);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to add item to cart
app.get('/admin/cart/addItem/:username/:itemId/:quantity', async (req, res) => {
    try {
        const username = req.params.username;
        const item_id = req.params.itemId;
        const quantity = req.params.quantity;
        const result = await addCartItem(username, item_id, quantity);
        if (result) {
            res.status(200).send('Item successfully registered');
        } else {
            res.status(500).send('Item registration failure');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to remove item from cart
app.delete('/admin/cart/removeItem/:cartId', async (req, res) => {
    try {
        const cart_id = req.params.cartId;
        const result = await removeCartItem(cart_id);
        if (result) {
            res.status(200).send('Item successfully deleted');
        } else {
            res.status(500).send('Item failed to be deleted');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to get all items for username
app.get('/admin/merchandise/getItems', async (req, res) => {
    try {
        const merchandise = await getAllMerchandise();
        res.json(merchandise);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to get all merchandise under id
app.get('/admin/merchandise/getItem/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const merchandise = await getMerchandise(id);
        res.json(merchandise);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to get tickets for username
app.get('/admin/tickets/getTickets/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const tickets = await getTickets(username);
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

// Admin use to add tickets for username
app.get('/admin/tickets/addTicket/:username/:ticketType/:dateValid', async (req, res) => {
    console.log("testing");
    try {
        const username = req.params.username;
        const ticketType = req.params.ticketType;
        const dateValid = req.params.dateValid;
        console.log("username: ", username, " |type: ", ticketType, " |date: ", dateValid);
        const result = await addTicket(username, ticketType, dateValid);
        console.log("result: ", result)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});


// Calls the getUsers() DB method
// returns all of the users
app.get('/users/getUsers', async (req, res) => {
    try {
	const users = await getUsers();
	res.json(users);
    } catch (err) {
	console.error(err);
	res.status(500).send('Something went wrong');
    }
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
app.post('/users/registerUser', async (req, res) => {
    try {

        //const { username, lastname, firstname, email, password} = req.body;
        //const username = req.body.username;
        //const lastname = req.body.lastname;
        //const firstname = req.body.firstname;
        //const email = req.body.email;
        //const password = req.body.password;

        const username = req.body.username;
        const lastname = req.body.last_name;
        const firstname = req.body.first_name;
        const email = req.body.email;
        const password = req.body.password;

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

app.get('/login', async (req, res) => {
    res.send("login here:")
})

// Calls the getComments() DB method
// returns all of the comments that have been made
app.get('/comments/getComments', async (req, res) => {
    try {
        const comments = await getComments();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the changeEmail() DB method
// updates the email of the user given their username
app.put('/users/changeEmail/:username/:newEmail', async (req, res) => {
    try {
        const username = req.params.username;
        const newEmail = req.params.newEmail;
        const result = await changeEmail(username, newEmail);
        if (result) {
            res.status(200).send('Email successfully updated');
        } else {
            res.status(500).send('Email update failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the removeUser() DB method
// removes/deletes the users account
// -- might need to add some code changes here
app.delete('/users/removeUser/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const result = await removeUser(username);
        if (result) {
            res.status(200).send('User successfuly deleted');
        } else {
            res.status(500).send('User deletion failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// Calls the purchaseTicket() DB method
// adds the tickets given the user, ticket type, and dates
app.post('/tickets/purchaseTickets', async (req, res) => {
    try {
        const userId = req.body.userId;
        const ticketType = req.body.ticketType;
        const dateValid = req.body.dateValid;
        const result = await purchaseTicket(userId, ticketType, dateValid);
        if (result) {
            res.status(200).send('Tickets successfully purchased');
        } else {
            res.status(500).send('Ticket purchase failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
module.exports = app;
