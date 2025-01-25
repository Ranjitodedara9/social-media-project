const express = require("express");
const userRouter = new express.Router();
const userController = require("../controller/userController");

userRouter.post("/register", userController.userRegistration);
userRouter.post("/login", userController.userLogin);

userRouter.get("/", (req, res) => {
  res.send("backend work...");
});

module.exports = userRouter;
