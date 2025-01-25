const userService = require("../services/userService");

const userController = {
  userRegistration: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await userService.registerUser(username, password);

      res.status(201).json({
        message: "User registered successfully!",
        user,
      });
    } catch (error) {
      console.error("Error in user registration:", error.message);

      if (error.message === "Username and password are required.") {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === "Username already exists.") {
        return res.status(409).json({ error: error.message });
      }

      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  },
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await userService.loginUser(username, password);

      res.status(201).json({
        message: "User Login successfully!",
        user,
      });
    } catch (error) {
      console.error("Error in user Login:", error.message);

      if (error.message === "User Not exists.") {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === "Incorrect username or password.") {
        return res.status(409).json({ error: error.message });
      }

      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  },
};

module.exports = userController;
