var mysql = require('mysql2');
var dotenv = require('dotenv');
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // 127.0.0.1;
    user: process.env.MYSQL_USER, // 'swe-proj-sql-user'
    password: process.env.MYSQL_PASSWORD, // '/Liang1234'
    database: process.env.MYSQL_DATABASE // 'csci_swe_project'
}).promise()

async function getUsers() {
    const result = await pool.query("SELECT * FROM users")
    const rows = result[0]
    // or: const [rows] = await pool.query("SELECT * FROM users")
    return rows
} // getNotes

async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]) 
    return rows
} // getNote

async function getUsername(id) {
    const [rows] = await pool.query("SELECT username FROM users WHERE id = ?", [id]) 
    return rows
} // getUsername

async function createUser(username, lastname, firstname, email) {
    const [result] = await pool.query("INSERT INTO users (username, last_name, first_name, email) VALUE (?, ?, ?, ?)", [username, lastname, firstname, email])
    const id = result.insertId
    return getNote(id)
} // createNote

async function getComments() {
    const result = await pool.query("SELECT * FROM comments")
    const rows = result[0]
    return rows
} // getComments

async function changeEmail(id, newemail) {
    const [result] = await pool.query("UPDATE users SET email = ? WHERE id = ?", newemail, id)
    if (result.changedRows > 0) {
        return true; // Email was successfully updated
      } else {
        return false; // No rows were updated, email update failed
      }
} // changeEmail

module.exports = {
    getUsers,
    getUser,
    createUser,
    getComments, 
    changeEmail
};

// testing

async function run() {
    const users = await getUsers()
    // console.log(users)
} 

run()
