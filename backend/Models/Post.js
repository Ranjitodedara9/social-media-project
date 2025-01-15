const conn = require("../db/conn");
/*
const sql = `
    CREATE TABLE posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      title VARCHAR(255),
      description VARCHAR(255)
    )
  `;
  */

const sql = `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )
`;

conn.query(sql, (err, result) => {
  if (err) {
    throw err;
  } else {
    console.log("User table Created..");
  }
});
