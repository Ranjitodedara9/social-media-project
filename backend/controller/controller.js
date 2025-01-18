const conn = require("../db/conn");
const bcrypt = require("bcrypt");
const { generateToken } = require("../mIddleware/Auth");

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

      // Hash the password
      const saltRounds = 10; // Higher value = more secure but slower
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert into database
      conn.query(
        "INSERT INTO users SET ?",
        { username, password: hashedPassword }, // Store the hashed password
        (err, result) => {
          if (err) {
            console.error("Error adding User data:", err.message);
            return res
              .status(500)
              .json({ error: "Failed to add User data to the database" });
          }
          const token = generateToken(username);
          res
            .status(201)
            .json({
              message: "User added successfully",
              token,
              data: { username },
            }); // Avoid returning the password
        }
      );
    } catch (error) {
      console.error("Error during user registration:", error.message);
      res.status(500).json({ error: "An error occurred during registration" });
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

  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      conn.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {
          if (err) {
            console.error("Error querying the database:", err.message);
            return res.status(500).json({ error: "Database error" });
          }

          // Check if user exists
          if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
          }

          const user = results[0];

          // Compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          const payload = { username: username };
          const token = generateToken(payload);

          res.status(200).json({ message: "Login successful", token, user });
        }
      );
    } catch (error) {
      console.error("Invalid username or password!", error);
      res.status(500).json({ error: "Invalid username or password" });
    }
  },
};

module.exports = Controller;
