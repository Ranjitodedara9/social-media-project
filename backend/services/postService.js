const db = require("../Models/index");

const Post = db.Post;

const postService = {
  postAdding: async (username, title, description) => {
    if (!username || !title) {
      throw new Error("Username and title are required.");
    }

    const post = await Post.create({ username, title, description });

    return {
      id: post.id,
      username: post.username,
      title: post.title,
      description: post.description,
    };
  },

  postGet: async () => {
    const allPost = await Post.findAll();

    return allPost;
  },
};

module.exports = postService;
