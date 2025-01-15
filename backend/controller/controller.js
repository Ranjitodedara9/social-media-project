const conn = require("../db/conn");

const Controller = {
  postSend: async (req, res) => {
    const { username, description } = req.body;

    if (!username || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    conn.query(
      "INSERT INTO posts SET ?",
      { username, description },
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
};

module.exports = Controller;
