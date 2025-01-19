const db = require("../Models/index");
const bcrypt = require("bcrypt");
const User = db.User;
const { generateToken } = require("../mIddleware/Auth");

const userService = {
  registerUser: async (username, password) => {
    if (!username || !password) {
      throw new Error("Username and password are required.");
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = {
      username,
    };

    const token = await generateToken(payload);

    const userData = await User.create({ username, password: hashedPassword });

    return {
      token,
      id: userData.id,
      username: userData.username,
    };
  },
  loginUser: async (username, password) => {
    if (!username || !password) {
      throw new Error("Username and password are required.");
    }

    const existingUser = await User.findOne({ where: { username } });

    if (!existingUser) {
      throw new Error("User Not exists.");
    }

    const payload = {
      username,
    };

    const token = await generateToken(payload);

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect username or password.");
    }

    return { token, id: existingUser.id, username: existingUser.username };
  },
};

module.exports = userService;
