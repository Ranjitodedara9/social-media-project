const postService = require("../services/postService");
const db = require("../Models/index");
const { Model } = require("sequelize");
const Post = db.Post;
const Comments = db.Comments;

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

  postGetById: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findByPk(id);
      res.status(201).json(post);
    } catch (error) {}
    console.log({ error: "Error in Find by id Post" });
  },

  postComment: async (req, res) => {
    const comment = req.body;
    const response = await Comments.create(comment);
    res.status(201).json(response);
  },

  commentGetById: async (req, res) => {
    const comid = req.params.id; // Get the ID from request parameters
    try {
      // Fetch the post along with its comments
      const data = await Post.findAll({
        attributes: ["username", "title"],
        include: [
          {
            model: Comments,
            attributes: ["username", "commentBody", "post_Id"],
          },
        ],
        where: { id: comid },
      });

      if (!data) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching post with comments:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the post" });
    }
  },
};

module.exports = postController;
