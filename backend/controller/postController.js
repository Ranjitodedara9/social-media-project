const postService = require("../services/postService");
const db = require("../Models/index");
const { Model, where } = require("sequelize");
const Post = db.Post;
const Comments = db.Comments;
const User = db.User;
const Likes = db.Likes;

const postController = {
  postAdd: async (req, res) => {
    try {
      const { username, title, description, user_id } = req.body;

      const post = await postService.postAdding(
        username,
        title,
        description,
        user_id
      );

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

      // Fetch the post with associated comments
      const post = await Post.findByPk(id, {
        include: [Comments], // Include related `Comments` model
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error("Error in Find by ID Post:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the post." });
    }
  },

  deletePost: async (req, res) => {
    const id = req.params.id; // Get the ID from request parameters
    try {
      // Ensure you're passing the condition as an object
      const dltData = await Post.destroy({ where: { id } });

      if (dltData) {
        res.status(200).json({ message: "Post deleted successfully" });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post" });
    }
  },

  updatePost: async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
      // Perform the update operation
      const [updatedRowCount] = await Post.update(
        { title, description }, // Data to update
        { where: { id } } // Specify which record(s) to update
      );

      if (updatedRowCount === 0) {
        // No rows were updated
        return res
          .status(404)
          .json({ message: "Post not found or no changes made" });
      }

      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.error("Error updating post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the post" });
    }
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
            attributes: ["username", "commentBody", "post_Id", "commentCount"],
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
  postUserAuth: async (req, res) => {
    const comid = req.params.id; // Get the ID from request parameters
    try {
      // Fetch the post along with its comments
      const data = await User.findAll({
        attributes: ["username"],
        include: [
          {
            model: Post,
            attributes: ["id", "username", "title", "description"],
          },
        ],
        where: { id: comid },
      });

      if (!data) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching post with User:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the post" });
    }
  },

  LikePost: async (req, res) => {
    const postId = req.params.id; // Ensure consistent variable naming
    const userId = req.user?.id;

    console.log(req.user);

    if (!userId) {
      return res.status(400).json({ error: "User not authenticated." });
    }
    try {
      // Check if the user already liked the post
      const found = await Likes.findOne({
        where: { likeId: postId, user_Id: userId },
      });

      if (!found) {
        // Add a like if not found
        await Likes.create({ likeId: postId, user_Id: userId });
        return res.status(200).json({ message: "Like added!" });
      } else {
        // Remove the like if found
        await Likes.destroy({
          where: { likeId: postId, user_Id: userId },
        });
        return res.status(200).json({ message: "Like removed!" });
      }
    } catch (error) {
      console.error("Error in LikePost:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the like." });
    }
  },
};

module.exports = postController;
