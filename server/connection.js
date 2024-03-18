var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "swe-proj-sql-user",
  password: "/Liang1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
