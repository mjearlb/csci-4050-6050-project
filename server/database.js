import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'swe-proj-sql-user',
    password: '/Liang1234',
    database: 'csci_swe_project'
}).promise()

const result = await pool.query("SELECT * FROM notes")
const rows = result[0]
// or: const [rows] = await pool.query("SELECT * FROM notes")
console.log(rows)

