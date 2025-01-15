const mysql = require("mysql2");

const conn = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Mysql@@@###123", // Replace with your actual password
  database: "social-media", // Replace with your actual database name
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected....");
});

module.exports = conn;
