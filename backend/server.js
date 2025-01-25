const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
require("./Models/index");
const postRouter = require("./Routes/postRoute");
const userRouter = require("./Routes/userRoutes");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(userRouter, postRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server run on Port ${PORT}`);
});
