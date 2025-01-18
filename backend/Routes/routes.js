const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const Controller = require("../controller/controller");
const { authenticateToken } = require("../mIddleware/Auth");

// For Post

router.post("/post", authenticateToken, Controller.postSend);

router.get("/post", authenticateToken, Controller.postGet);

// For user Login And Sige-up

router.post("/users", Controller.userPost);

router.get("/users", Controller.userGet);

router.post("/login", Controller.userLogin);
module.exports = router;
