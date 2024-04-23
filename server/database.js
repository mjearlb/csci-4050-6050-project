var mysql = require('mysql2');
var dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // 127.0.0.1;
    user: process.env.MYSQL_USER, // 'swe-proj-sql-user'
    password: process.env.MYSQL_PASSWORD, // '/Liang1234'
    database: process.env.MYSQL_DATABASE // 'csci_swe_project'
}).promise()

// returns all users
async function getUsers() {
    const result = await pool.query("SELECT * FROM users")
    const rows = result[0]
    // or: const [rows] = await pool.query("SELECT * FROM users")
    return rows
} // getUsers

// returns user info for given id
async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]) 
    return rows
} // getUser

// returns user info for given username
async function getUserByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]) 
    return rows
} // getUser

// returns username of user given id
async function getUsername(id) {
    const [rows] = await pool.query("SELECT username FROM users WHERE id = ?", [id]) 
    return rows
} // getUsername

// 
async function getId(username) {
    const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]) 
    return rows[0]
} // getId
4
async function createUser(username, lastname, firstname, email, password) {
    const [result] = await pool.query("INSERT INTO users (username, last_name, first_name, email, password) VALUES (?, ?, ?, ?, ?)", [username, lastname, firstname, email, password])
    if (result.affectedRows > 0) {
        return true; // user was created
    } else {
        return false; // user was not created
    }
} // createNote

async function registerUser(username, lastname, firstname, email, password) {
    const [emailCheck] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    const [usernameCheck] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    if (emailCheck.length > 0) { // email already exists
        return false
    } 
    if (usernameCheck.length > 0) { // username already exists
        return false
    }
    const result = await createUser(username, lastname, firstname, email, password)
    return result
} // registerUser   

// Verifies that password matches too username
async function verifyLogin(username, password) {
    const [result] = await pool.query("SELECT password FROM users WHERE username = ?", [username]);
    if (result && result.length > 0 && result[0].password === password) {
        return true;
    } else {
        return false;
    }
} // verifyLogin

async function getComments() {
    const result = await pool.query("SELECT * FROM comments")
    const rows = result[0]
    return rows
} // getComments

async function removeUser(username) {
    const [result] = await pool.query("DELETE FROM users WHERE username = ?", [username])
    if (result.affectedRows > 0) {
        return true; // user was successfully removed
    } else {
        return false; // No rows were updated, user deletion failed
    }
} // removeUser

async function changeEmail(username, newEmail) {
    const user = await getId(username)
    const id = user.id
    const [result] = await pool.query("UPDATE users SET email = ? WHERE id = ?", [newEmail, id])
    if (result.changedRows > 0) {
        return true; // Email was successfully updated
      } else {
        return false; // No rows were updated, email update failed
      }
} // changeEmail

async function purchaseTicket(userId, ticketType, dateValid) {
    const [result] = await pool.query("INSERT INTO tickets (user_id, ticket_type, date_valid) VALUES (?,?,?)",[userId, ticketType, dateValid])
    if (result.changedRows > 0) {
        return true; // ticket was purchased
    } else {
        return false; // No rows were updated, ticket purchase failed
    }
} // purchaseTicket

// returns cart items of user given id
async function getCart(username) {
    const id = await getId(username);
    const [rows] = await pool.query("SELECT * FROM cart WHERE user_id = ?", [id.id])
    return rows
} // getCartItems

// adds item to cart
async function addCartItem(username, item_id, quantity) {
    const user_id = await getId(username);
    const time_added = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const [result] = await pool.query("INSERT INTO cart (user_id, item_id, quantity, time_added, is_active) VALUES (?, ?, ?, ?, ?)", [user_id.id, item_id, quantity, time_added, 1]);
    if (result.affectedRows > 0) {
        return true; // cart was created
    } else {
        return false; // cart was not created
    }
} // addCartItem

// removes item from cart
async function removeCartItem(cart_id) {
    const [result] = await pool.query("DELETE FROM cart WHERE cart_id = ?", [cart_id])
    if (result.affectedRows > 0) {
        return true; // cart was successfully removed
    } else {
        return false; // No rows were updated, cart deletion failed
    }
} // removeCartItem

// Returns all merchandise
async function getAllMerchandise() {
    const result = await pool.query("SELECT * FROM merchandise")
    const rows = result[0]
    return rows
} // getMerchandise

// Returns merchandise for given id
async function getMerchandise(id) {
    const [rows] = await pool.query("SELECT * FROM merchandise WHERE item_id = ?", [id]) 
    return rows
} // getMerchandise

// checks if login info is correct
async function checkLogin(username, password) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    if (rows.length == 0) {
        return false
    }
    const user = rows[0]
    if (user.password == password) {
        return true
    } else {
        return false
    }
} // checkLogin

async function purchaseTicket(user_id, ticket_type, date_valid) {
    const [result] = await pool.query("INSERT INTO tickets (user_id, ticket_type, date_valid) VALUES (?, ?, ?)", [user_id, ticket_type, date_valid])
    if (result.affectedRows > 0) {
        return true; // ticket was created
    } else {
        return false; // ticket was not created
    }
} // purchaseTicket

async function getTickets(user_id) {
    const [result] = await pool.query("SELECT * FROM tickets WHERE user_id = ?", [user_id])
    const tickets = result[0]
    return result
} // getTickets
 

module.exports = {
    getUsers,
    getUser,
    registerUser,
    removeUser,
    getComments, 
    changeEmail, 
    purchaseTicket, 
    verifyLogin, 
    getUserByUsername, 
    getCart,
    addCartItem,
    removeCartItem,
    getMerchandise,
    getAllMerchandise, 
    checkLogin, 
    purchaseTicket, 
    getTickets
};

// testing

async function run() {
    //const testPurchTick = await purchaseTicket(1000, "General Admission", "2024-04-23")
    //console.log(await getTickets(1000))
}

run()
