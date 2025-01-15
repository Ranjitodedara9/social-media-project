const conn = require("../db/conn");

const Controller = {
  postSend: async (req, res) => {
    const { username, title, description } = req.body;

    if (!username || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    conn.query(
      "INSERT INTO posts SET ?",
      { username, title, description },
      (err, result) => {
        if (err) {
          console.error("Error adding data:", err.message);
          return res
            .status(500)
            .json({ error: "Failed to add data to the database" });
        }
        res
          .status(201)
          .json({ message: "Post added successfully", data: req.body });
      }
    );
  },

  postGet: async (req, res) => {
    conn.query("SELECT * FROM posts", (err, result) => {
      if (err) {
        console.error("Error Geting data:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to get data to the database" });
      } else {
        res.status(201).json(result);
      }
    });
  },

  userPost: async (req, res) => {
    try {
      const { username, password } = req.body;

      conn.query(
        "INSERT INTO users SET ?",
        { username, password },
        (err, result) => {
          if (err) {
            console.error("Error adding User data:", err.message);
            return res
              .status(500)
              .json({ error: "Failed to add User data to the database" });
          }
          res
            .status(201)
            .json({ message: "User added successfully", data: req.body });
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  userGet: async (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.error("Error Geting user data:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to get user data to the database" });
      } else {
        res.status(201).json(result);
      }
    });
  },
};

module.exports = Controller;
