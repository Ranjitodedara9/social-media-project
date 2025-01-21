const express = require("express");
const postRouter = new express.Router();
const postController = require("../controller/postController");
const { authenticateToken } = require("../mIddleware/Auth");

postRouter.post("/post", authenticateToken, postController.postAdd);
postRouter.get("/post", authenticateToken, postController.allPostGet);
postRouter.get("/postbyid/:id", authenticateToken, postController.postGetById);

postRouter.post("/post/comments", postController.postComment);

postRouter.get("/post/comments/:id", postController.commentGetById);

module.exports = postRouter;
