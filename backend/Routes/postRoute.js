const express = require("express");
const postRouter = new express.Router();
const userController = require("../controller/postController");
const { authenticateToken } = require("../mIddleware/Auth");

postRouter.post("/post", authenticateToken, userController.postAdd);
postRouter.get("/post", authenticateToken, userController.allPostGet);

module.exports = postRouter;
