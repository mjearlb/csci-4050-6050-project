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

async function getComments() {
    const result = await pool.query("SELECT * FROM comments")
    const rows = result[0]
    return rows
} // getComments

async function getChildComments(parent_id) {
    const result = await pool.query("SELECT * FROM comments WHERE parent_id = ?", [parent_id])
    const children = result[0]
    return children
} // getChildComments

async function deleteChildComments(parent_id) {
    const result = await pool.query("DELETE FROM comments WHERE parent_id = ?", [parent_id])
} // deleteChildComments

// add comment to database
async function addComment(username, comment) {
    const user_id = await getId(username);
    const [result] = await pool.query("INSERT INTO comments (user_id, comment) VALUES (?, ?)", [user_id.id, comment]);
    if (result.affectedRows > 0) {
        return true; // comment was created
    } else {
        return false; // comment was not created
    }
} // addComment 

// add comment that is a reply to database
async function addCommentReply(username, comment, parent_id) {
    const user_id = await getId(username);
    const [result] = await pool.query("INSERT INTO comments (user_id, comment, parent_id) VALUES (?, ?, ?)", [user_id.id, comment, parent_id]);
    if (result.affectedRows > 0) {
        return true; // comment was created
    } else {
        return false; // comment was not created
    }
} // addCommentReply

async function deleteComment(comment_id) {
    const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [comment_id]);
    const [result2] = await pool.query("DELETE FROM comments WHERE parent_id = ?", [comment_id]);
    if (result.affectedRows > 0) {
        return true; // comment was created
    } else {
        return false; // comment was not created
    }
} // deleteComment

async function deleteAllComments(user_id) {
    const [parent] = await pool.query("SELECT * FROM comments WHERE user_id = ?", [user_id]);
    const delChildren = await deleteChildComments(parent.id)
    const [result2] = await pool.query("DELETE FROM comments WHERE user_id = ?", [user_id]);
    if (result2.affectedRows > 0) {
        return true; // comment was created
    } else {
        return false; // comment was not created
    }
} // deleteAllComments

async function deleteAllTickets(user_id) {
    const [result] = await pool.query("DELETE FROM tickets WHERE user_id = ?", [user_id]);
    if (result.affectedRows > 0) {
        return true; // comment was created
    } else {
        return false; // comment was not created
    }
} // deleteAllTickets

async function removeUser(username) {
    id = await getId(username)
    dumpCart(id.id)
    deleteAllComments(id.id)
    deleteAllTickets(id.id)
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

// returns cart items of user given id
async function getCart(username) {
    const id = await getId(username);
    const [rows] = await pool.query("SELECT * FROM cart WHERE user_id = ?", [id.id])
    return rows
} // getCartItems

// adds item to cart
async function addCartItem(username, item_id, quantity) {
    const user_id = await getId(username);
    const [result] = await pool.query("INSERT INTO cart (user_id, item_id, quantity, is_active) VALUES (?, ?, ?, ?)", [user_id.id, item_id, quantity, 1]);
    if (result.affectedRows > 0) {
        return true; // item was added to cart
    } else {
        return false; // item was not added to cart
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

async function dumpCart(user_id) {
    const [result] = await pool.query("DELETE FROM cart WHERE user_id = ?", [user_id])
} // dumpCart

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

async function purchaseTicket(username, ticket_type, date_valid) {
    const user_id = await getId(username);
    const [result] = await pool.query("INSERT INTO tickets (user_id, ticket_type, date_valid) VALUES (?, ?, ?)", [user_id.id, ticket_type, date_valid])
    if (result.affectedRows > 0) {
        return true; // ticket was created
    } else {
        return false; // ticket was not created
    }
} // purchaseTicket

async function getTickets(username) {
    const id = await getId(username);
    const [rows] = await pool.query("SELECT * FROM tickets WHERE user_id = ?", [id.id])
    return rows
} // getTickets
 

module.exports = {
    getUsers,
    getUser,
    registerUser,
    removeUser,
    getComments, 
    getChildComments,
    addComment,
    addCommentReply,
    changeEmail, 
    purchaseTicket, 
    getUserByUsername, 
    getCart,
    addCartItem,
    removeCartItem,
    getMerchandise,
    getAllMerchandise, 
    checkLogin, 
    purchaseTicket, 
    getTickets, 
    getUsername, 
    deleteAllComments, 
    deleteComment, 
    deleteAllTickets, 
    dumpCart
};

// testing

async function run() {
    const addUser = await registerUser("TEST", "TEST", "TEST", "TEST", "TEST")
    const addComments = await addComment("TEST", "TEST")
    const remove = await removeUser("TEST")
}

//run()
