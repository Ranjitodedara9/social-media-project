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

    const userData = await User.create({ username, password: hashedPassword });

    const payload = {
      username: userData.username,
      id: userData.id,
    };

    const token = await generateToken(payload);

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
      username: existingUser.username,
      id: existingUser.id,
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
