var mysql = require('mysql');
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, // 127.0.0.1;
    user: process.env.MYSQL_USER, // 'swe-proj-sql-user'
    password: process.env.MYSQL_PASSWORD, // '/Liang1234'
    database: process.env.MYSQL_DATABASE // 'csci_swe_project'
}).promise()

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
