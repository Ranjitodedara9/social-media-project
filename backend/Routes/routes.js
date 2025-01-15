const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const Controller = require("../controller/controller");

router.post("/sendPost", Controller.postSend);

router.get("/getPost", Controller.postGet);

module.exports = router;
