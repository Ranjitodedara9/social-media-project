const postService = require("../services/postService");

const postController = {
  postAdd: async (req, res) => {
    try {
      const { username, title, description } = req.body;

      const post = await postService.postAdding(username, title, description);

      res.status(201).json({ message: "Post Add successfully!", post });
    } catch (error) {
      console.error("Error in post Adding:", error.message);

      if (error.message === "Username and title are required.") {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  },

  allPostGet: async (req, res) => {
    try {
      const allPost = await postService.postGet();

      res.status(201).json({ message: "Post Get successfully!", allPost });
    } catch (error) {
      console.log({ error: "Post Not get" });
      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  },
};

module.exports = postController;
