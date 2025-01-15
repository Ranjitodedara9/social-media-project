const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const router = require("./Routes/routes");
const app = express();
require("./db/conn");
//require("./Models/Post");

app.use(express.json());
app.use(cors());

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server run on Port ${PORT}`);
});
