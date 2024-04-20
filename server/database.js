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
} // getNotes

// returns user info for given id
async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]) 
    return rows
} // getNote

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

async function createUser(username, lastname, firstname, email, password) {
    const [result] = await pool.query("INSERT INTO users (username, last_name, first_name, email, password) VALUES (?, ?, ?, ?, ?)", [username, lastname, firstname, email, password])
    if (result.affectedRows > 0) {
        return true; // user was created
    } else {
        return false; // user was not created
    }
} // createNote

async function registerUser(username, lastname, firstname, email, password) {
    console.log("Received values for registration: in database registerUser: ");
    console.log("Username:", username);
    console.log("Last Name:", lastname);
    console.log("First Name:", firstname);
    console.log("Email:", email);
    console.log("Password:", password);
    const [emailCheck] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    const [usernameCheck] = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    if (emailCheck.length > 0) {
        return false
    } 
    if (usernameCheck.length > 0) {
        return false
    }
    const result = await createUser(username, lastname, firstname, email, password)
    return result
} // registerUser   

async function getComments() {
    const result = await pool.query("SELECT * FROM comments")
    const rows = result[0]
    return rows
} // getComments

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

async function removeUser(username) {
    const [result] = await pool.query("DELETE FROM users WHERE username = ?", [username])
    if (result.changedRows > 0) {
        return true; // user was successfully removed
    } else {
        return false; // No rows were updated, user deletion failed
    }
} // removeUser

async function purchaseTicket(userId, ticketType, dateValid) {
    const [result] = await pool.query("INSERT INTO tickets (user_id, ticket_type, date_valid) VALUES (?,?,?)",[userId, ticketType, dateValid])
    if (result.changedRows > 0) {
        return true; // ticket was purchased
    } else {
        return false; // No rows were updated, ticket purchase failed
    }
} // purchaseTicket

// returns cart items of user given id
async function getCartItems(id) {
    const [rows] = await pool.query("SELECT * FROM cart WHERE user_id = ?", [id])
    return rows
} // getCartItems

module.exports = {
    getUsers,
    getUser,
    registerUser,
    getComments, 
    changeEmail, 
    purchaseTicket,
    getCartItems
};

// testing

async function run() {
    const testRegUser = registerUser("testUser", "Last", "First", "ex@ex.com", "Pass!")
} 

run()
