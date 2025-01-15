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
};

module.exports = Controller;
