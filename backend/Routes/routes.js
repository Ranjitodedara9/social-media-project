const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const Controller = require("../controller/controller");

router.post("/post", Controller.postSend);

router.get("/post", Controller.postGet);

router.post("/users", Controller.userPost);

router.get("/users", Controller.userGet);

module.exports = router;
