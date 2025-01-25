const express = require("express");
const postRouter = new express.Router();
const postController = require("../controller/postController");
const { authenticateToken } = require("../mIddleware/Auth");

postRouter.post("/post", authenticateToken, postController.postAdd);
postRouter.get("/post", authenticateToken, postController.allPostGet);
postRouter.get("/postbyid/:id", authenticateToken, postController.postGetById);
postRouter.get("/postuserauth/:id", postController.postUserAuth);

postRouter.delete(
  "/post/delete/:id",
  authenticateToken,
  postController.deletePost
);

postRouter.put(
  "/post/update/:id",
  authenticateToken,
  postController.updatePost
);

postRouter.post("/post/comments", postController.postComment);

postRouter.get("/post/comments/:id", postController.commentGetById);

postRouter.post("/post/likes/:id", authenticateToken, postController.LikePost);

module.exports = postRouter;
