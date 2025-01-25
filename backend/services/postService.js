const db = require("../Models/index");

const Post = db.Post;
const Likes = db.Likes;
const Comment = db.Comments;

const postService = {
  postAdding: async (username, title, description, user_id) => {
    if (!username || !title || !user_id) {
      throw new Error("Username and title are required.");
    }

    const post = await Post.create({ username, title, description, user_id });

    return {
      id: post.id,
      username: post.username,
      title: post.title,
      description: post.description,
      user_id: post.user_id,
    };
  },

  postGet: async () => {
    const allPost = await Post.findAll({ include: [Likes, Comment] });

    return allPost;
  },
};

module.exports = postService;
