var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "swe-proj-sql-user",
  password: "/Liang1234",
  database: "csci_swe_project"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// close the MySQL connection
connection.end();
